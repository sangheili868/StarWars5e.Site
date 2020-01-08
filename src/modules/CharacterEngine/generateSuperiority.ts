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

function getArchetypeField (archetypeData: ArchetypeType, level: number, field: string): string {
  const fieldIndex = field === 'Superiority Dice' ? 1 : 0
  return get(archetypeData, `leveledTable.${level}.${fieldIndex}.value`) as (string | undefined) || '0'
}

function getMulticlassDice (
  rawCharacter: RawCharacterType,
  myClasses: ClassType[],
  myArchetypes: ArchetypeType[],
  initialClass: string
) {
  return chain(rawCharacter.classes)
    .filter(multiclassClass =>
      isSuperiorityClass(multiclassClass) &&
      multiclassClass.name !== initialClass
    )
    .reduce((sum, multiclassClass) => {
      const classData = myClasses.find(({ name }) => name === multiclassClass.name)
      const classGains = (classData ? chain(classData.levelChanges)
        .map('Superiority Dice')
        .slice(0, multiclassClass.levels)
        .filter((level: string) => parseInt(level) > 0)
        .uniq()
        .value()
        .length : 0)
      const archetypeData = myArchetypes.find(({ name }) => name === get(multiclassClass, 'archetype.name'))
      const archetypeGains = (archetypeData ? chain(archetypeData.leveledTable)
        .pickBy((fields, level) => parseInt(level) <= multiclassClass.levels)
        .map(fields => fields[1].value)
        .uniq()
        .value()
        .length : 0)
      return sum + classGains + archetypeGains
    }, 0)
    .value()
}

function getSuperiorityValues (
  rawCharacter: RawCharacterType,
  myClasses: ClassType[],
  myArchetypes: ArchetypeType[]
): {
  maxDice: number,
  diceSize: string,
  saveDcAbilities: string[]
} | false {
  const completeClass = rawCharacter.classes.find(isSuperiorityClass)
  if (!completeClass) return false
  const classData = myClasses.find(({ name }) => name === completeClass.name)
  if (!classData) return false
  const archetypeData = myArchetypes.find(({ name }) => name === get(completeClass, 'archetype.name'))
  const multiclassDice = getMulticlassDice(rawCharacter, myClasses, myArchetypes, completeClass.name)

  switch (completeClass.name) {
    case 'Fighter':
      const maxDice = parseInt(getClassField(classData, completeClass.levels, 'Superiority Dice')) + multiclassDice
      const saveDcAbilities = ['Strength', 'Dexterity']
      const isTactical = completeClass.archetype && completeClass.archetype.name === 'Tactical Specialist'
      if (isTactical && archetypeData) {
        return {
          diceSize: getArchetypeField(archetypeData, completeClass.levels, 'Combat Superiority'),
          maxDice: maxDice + parseInt(getArchetypeField(archetypeData, completeClass.levels, 'Superiority Dice')),
          saveDcAbilities
        }
      } else if (completeClass.levels === 1) {
        return false
      } else {
        return {
          diceSize: 'd4',
          maxDice,
          saveDcAbilities
        }
      }
    case 'Scholar':
      return {
        diceSize: getClassField(classData, completeClass.levels, 'Academic Superiority'),
        maxDice: parseInt(getClassField(classData, completeClass.levels, 'Superiority Dice')) + multiclassDice,
        saveDcAbilities: ['Intelligence']
      }
    case 'Scout':
      return archetypeData ? {
        diceSize: getArchetypeField(archetypeData, completeClass.levels, 'Focused Superiority'),
        maxDice: parseInt(getArchetypeField(archetypeData, completeClass.levels, 'Superiority Dice')) + multiclassDice,
        saveDcAbilities: ['Dexterity']
      } : false
    default:
      return false
  }
}

function getSaveDC (
  rawCharacter: RawCharacterType,
  proficiencyBonus: number,
  abilityScores: AbilityScoresType,
  saveDcAbilities: string[]
): number {
  const maxModifier = Math.max(...saveDcAbilities.map(saveDcAbility => abilityScores[saveDcAbility].modifier))
  return applyTweak(rawCharacter, 'superiority.maneuverSaveDC', 8 + proficiencyBonus + maxModifier)
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
  const superiority = getSuperiorityValues(rawCharacter, myClasses, myArchetypes)
  return superiority && {
    currentDice: rawCharacter.currentStats.superiorityDiceUsed,
    maxDice: applyTweak(rawCharacter, 'superiority.maxDice', superiority.maxDice),
    diceSize: superiority.diceSize,
    maneuverSaveDC: getSaveDC(rawCharacter, proficiencyBonus, abilityScores, superiority.saveDcAbilities),
    maneuvers: getManeuvers(rawCharacter, maneuvers)
  }
}
