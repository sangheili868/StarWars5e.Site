import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'

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

function getPrimarySuperiorityClass (rawCharacter: RawCharacterType) {
  const classData = rawCharacter.classes.find(myClass =>
    myClass.name === 'Fighter' ||
    myClass.name === 'Scholar' ||
    myClass.archetype.name === 'Deadeye Technique'
  )
  const className = classData && ((classData.archetype.name === 'Tactical Specialist') ? 'Tactical' : classData.name)
  const superiorityCalculator = superiorityCalculators[className || 'None']
  return {
    ...classData,
    maxDice: superiorityCalculator.getMaxDice(classData ? classData.levels : 0),
    diceSize: superiorityCalculator.getDiceSize(classData ? classData.levels : 0),
    saveDcAbilities: superiorityCalculator.saveDcAbilities
  }
}

function getSaveDC (proficiencyBonus: number, abilityScores: AbilityScoresType, saveDcAbilities: string[]) {
  return 8 + proficiencyBonus + Math.max(...saveDcAbilities.map(saveDcAbility => abilityScores[saveDcAbility].modifier))
}

function getMulticlassDiceBonus (rawCharacter: RawCharacterType) {
  return 0
}

export default function generateSuperiority (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  proficiencyBonus: number
) {
  const primaryClass = getPrimarySuperiorityClass(rawCharacter)
  return {
    currentDice: rawCharacter.currentStats.superiorityDice,
    maxDice: primaryClass.maxDice + getMulticlassDiceBonus(rawCharacter),
    diceSize: 'd' + primaryClass.diceSize,
    maneuverSaveDC: getSaveDC(proficiencyBonus, abilityScores, primaryClass.saveDcAbilities),
    maneuvers: [
      {
        'name': 'Heads Up',
        'description': 'When a friendly creature who can see or hear you makes a saving throw, you can use your reaction and expend a superiority die, adding the number rolled to the result of the saving throw. You can use this maneuver before or after making the saving throw, but before any effects of the saving throw are determined.'
      },
      {
        'name': 'One Step Ahead',
        'description': 'When you roll initiative and you are not surprised, you can expend a superiority die and add the number rolled to your initiative.'
      },
      {
        'name': 'Targeted Strike',
        'description': 'When an ally makes an attack against a creature, you can use your reaction to expend a superiority die. You add the superiority die to the attack roll, and the damage roll if it hits. You can use this maneuver before or after the attack roll, but before the GM determines whether or not the attack hits.'
      },
      {
        'name': 'Call the Guards',
        'description': 'When a creature makes an attack roll against you, you can use your reaction and expend a superiority die and command a willing ally within 5 feet of that creature to use their reaction to intercede. The creature is then forced to make an attack on the ally instead. If the attack misses, the ally can immediately make a weapon attack against that creature as a part of that same reaction. Roll the superiority die, and add the result to the ally’s attack roll.'
      }
    ]
  }
}
