import { RawCharacterType, RawClassType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { chain, concat, get } from 'lodash'
import { ManeuverType } from '@/types/characterTypes'
import applyTweak from '@/utilities/applyTweak'

const superiorityCalculators: { [myClass: string]: {
  getMaxDice: (level: number) => number,
  getDiceSize: (level: number) => number,
  saveDcAbilities: string[]
}} = {
  Fighter: {
    getMaxDice: (level: number) => (Math.ceil(level + 2) / 8) + 1,
    getDiceSize: (level: number) => 4,
    saveDcAbilities: ['Strength', 'Dexterity']
  },
  Tactical: {
    getMaxDice: (level: number) => 2 * ((Math.ceil(level + 2) / 8) + 1),
    getDiceSize: (level: number) => Math.min(2 * Math.ceil((level - 2) / 4) + 4, 12),
    saveDcAbilities: ['Strength', 'Dexterity']
  },
  Scholar: {
    getMaxDice: (level: number) => Math.min(2 * Math.ceil((level + 2) / 4), 10),
    getDiceSize: (level: number) => Math.min(2 * Math.ceil((level - 2) / 4) + 4, 12),
    saveDcAbilities: ['Intelligence']
  },
  Scout: {
    getMaxDice: (level: number) => (Math.ceil(level + 2) / 8) + 1,
    getDiceSize: (level: number) => Math.min(2 * Math.ceil((level - 2) / 4) + 4, 12),
    saveDcAbilities: ['Dexterity']
  },
  None: {
    getMaxDice: (level: number) => 0,
    getDiceSize: (level: number) => 0,
    saveDcAbilities: []
  }
}

function isSuperiorityClass (myClass: RawClassType) {
  return myClass.name === 'Fighter' ||
    myClass.name === 'Scholar' ||
    !!(myClass.archetype && myClass.archetype.name === 'Deadeye Technique')
}

function getPrimarySuperiorityClass (rawCharacter: RawCharacterType) {
  const classData = rawCharacter.classes.find(isSuperiorityClass)
  const className = classData && ((get(classData, 'archetype.name') === 'Tactical Specialist') ? 'Tactical' : classData.name)
  const superiorityCalculator = superiorityCalculators[className || 'None']
  return {
    ...classData,
    maxDice: superiorityCalculator.getMaxDice(classData ? classData.levels : 0),
    diceSize: superiorityCalculator.getDiceSize(classData ? classData.levels : 0),
    saveDcAbilities: superiorityCalculator.saveDcAbilities
  }
}

function getSaveDC (
  rawCharacter: RawCharacterType,
  proficiencyBonus: number,
  abilityScores: AbilityScoresType,
  saveDcAbilities: string[]
) {
  const maxModifier = Math.max(...saveDcAbilities.map(saveDcAbility => abilityScores[saveDcAbility].modifier))
  return applyTweak(rawCharacter, 'superiority.maneuverSaveDC', 8 + proficiencyBonus + maxModifier)
}

function getMulticlassDiceBonus (rawCharacter: RawCharacterType) {
  return Math.max(0, rawCharacter.classes.filter(isSuperiorityClass).length - 1)
}

function getManeuvers (rawCharacter: RawCharacterType, maneuvers: ManeuverType[]) {
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
  abilityScores: AbilityScoresType,
  proficiencyBonus: number,
  maneuvers: ManeuverType[]
) {
  const primaryClass = getPrimarySuperiorityClass(rawCharacter)
  const maxDice = applyTweak(rawCharacter, 'superiority.maxDice', primaryClass.maxDice + getMulticlassDiceBonus(rawCharacter))
  return primaryClass.diceSize !== 0 && {
    currentDice: rawCharacter.currentStats.superiorityDiceUsed,
    maxDice,
    diceSize: 'd' + primaryClass.diceSize,
    maneuverSaveDC: getSaveDC(rawCharacter, proficiencyBonus, abilityScores, primaryClass.saveDcAbilities),
    maneuvers: getManeuvers(rawCharacter, maneuvers)
  }
}
