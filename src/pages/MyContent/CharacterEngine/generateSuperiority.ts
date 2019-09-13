import { RawCharacterType } from '@/types/rawCharacterTypes'

export default function generateSuperiority (rawCharacter: RawCharacterType) {
  return {
    'currentDice': 4,
    'maxDice': 4,
    'diceSize': 'd6',
    'maneuverSaveDC': 15,
    'maneuvers': [
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
