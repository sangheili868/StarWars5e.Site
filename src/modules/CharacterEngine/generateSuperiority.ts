import { RawCharacterType, RawClassType } from '@/types/rawCharacterTypes'
import { AbilityScoresType, SuperiorityType } from '@/types/completeCharacterTypes'
import { chain, concat, get } from 'lodash'
import { ManeuverType, ClassType, ArchetypeType } from '@/types/characterTypes'
import applyTweak from '@/utilities/applyTweak'

function isSuperiorityClass (myClass: RawClassType): boolean {
  return myClass.name === 'Fighter' ||
    myClass.name === 'Scholar' ||
    !!(myClass.archetype && myClass.archetype.name === 'Deadeye Technique')
}

function getClassField (classData: ClassType, level: number, field: string): string {
  return get(classData, ['levelChanges', level, field]) as (string | undefined) || '0'
}

function getArchetypeField (archetypeData: ArchetypeType, level: number, index: number): string {
  return get(archetypeData, `leveledTable.${level}.${index}.value`) as (string | undefined) || '0'
}

function getMaxDice (
  rawCharacter: RawCharacterType,
  myClasses: ClassType[],
  myArchetypes: ArchetypeType[]
) {
  return chain(rawCharacter.classes)
    .filter(isSuperiorityClass)
    .reduce((sum, thisClass) => {
      const classData = myClasses.find(({ name }) => name === thisClass.name)
      const classGains = classData ? parseInt(classData.levelChanges[thisClass.levels]['Superiority Dice']) : 0
      const archetypeData = myArchetypes.find(({ name }) => name === get(thisClass, 'archetype.name'))
      const archetypeGains = archetypeData ? parseInt(archetypeData.leveledTable[thisClass.levels].find(({ key }) => key === 'Superiority Dice')!.value) : 0
      return sum + Math.max(classGains || 0, archetypeGains || 0)
    }, 0)
    .value()
}

function getDiceSize (
  rawCharacter: RawCharacterType,
  myClasses: ClassType[],
  myArchetypes: ArchetypeType[]
): string {
  const firstSuperiorityClass = rawCharacter.classes.find(isSuperiorityClass)
  if (!firstSuperiorityClass) return 'd0'
  const classData = myClasses.find(({ name }) => name === firstSuperiorityClass.name)
  if (!classData) return 'd0'
  const archetypeData = myArchetypes.find(({ name }) => name === get(firstSuperiorityClass, 'archetype.name'))
  const superiorityLevel = chain(rawCharacter.classes)
    .filter(isSuperiorityClass)
    .reduce((sum, thisClass) => sum + thisClass.levels, 0)
    .value()
  if (firstSuperiorityClass.name === 'Fighter') {
    return getClassField(classData, superiorityLevel, 'Combat Superiority')
  } else if (firstSuperiorityClass.name === 'Scholar') {
    return getClassField(classData, superiorityLevel, 'Academic Superiority')
  } else if (firstSuperiorityClass.name === 'Scout' && archetypeData) {
    return getArchetypeField(archetypeData, superiorityLevel, 0)
  } else {
    return 'd0'
  }
}

function getManeuvers (rawCharacter: RawCharacterType, maneuvers: ManeuverType[]): ManeuverType[] {
  return chain(rawCharacter.classes)
    .map((myClass: RawClassType) =>
      concat(myClass.maneuvers || [], (myClass.archetype && myClass.archetype.maneuvers) || []).map(maneuver => {
        const maneuverData = maneuvers.find(({ name }) => name === maneuver)
        if (!maneuverData) console.error('Warning: Maneuver not found: ' + maneuver)
        return maneuverData
      })
    )
    .flatten()
    .compact()
    .value()
}

export default function generateSuperiority (
  rawCharacter: RawCharacterType,
  myClasses: ClassType[],
  myArchetypes: ArchetypeType[],
  abilityScores: AbilityScoresType,
  proficiencyBonus: number,
  maneuvers: ManeuverType[]
): SuperiorityType | false {
  const maxDice = getMaxDice(rawCharacter, myClasses, myArchetypes)
  const physicalModifier = Math.max(...['Strength', 'Dexterity', 'Constitution'].map(ability => abilityScores[ability].modifier))
  const mentalModifier = Math.max(...['Intelligence', 'Wisdom', 'Charisma'].map(ability => abilityScores[ability].modifier))
  const generalModifier = chain(abilityScores).map('modifier').max().value()

  return maxDice > 0 && {
    currentDice: rawCharacter.currentStats.superiorityDiceUsed,
    maxDice: applyTweak(rawCharacter, 'superiority.maxDice', maxDice),
    diceSize: getDiceSize(rawCharacter, myClasses, myArchetypes),
    physicalModifier: applyTweak(rawCharacter, `superiority.physicalModifier`, physicalModifier),
    physicalSaveDC: applyTweak(rawCharacter, `superiority.physicalSaveDC`, 8 + proficiencyBonus + physicalModifier),
    mentalModifier: applyTweak(rawCharacter, `superiority.mentalModifier`, mentalModifier),
    mentalSaveDC: applyTweak(rawCharacter, `superiority.mentalSaveDC`, 8 + proficiencyBonus + mentalModifier),
    generalModifier: applyTweak(rawCharacter, `superiority.generalModifier`, generalModifier),
    generalSaveDC: applyTweak(rawCharacter, `superiority.generalSaveDC`, 8 + proficiencyBonus + generalModifier),
    maneuvers: getManeuvers(rawCharacter, maneuvers)
  }
}
