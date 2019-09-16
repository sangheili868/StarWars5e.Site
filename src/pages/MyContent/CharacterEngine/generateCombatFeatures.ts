import { RawCharacterType } from '@/types/rawCharacterTypes'
import { ClassType } from '@/types/characterTypes'

export default function generateCombatFeatures (rawCharacter: RawCharacterType, classes: ClassType[]) {
  return [
    {
      'name': 'Critical Analysis',
      'usage': 'bonusAction',
      'description': 'At 1st level, you are able to analyze a target, develop a plan on how to best overcome any potential obstacle, and execute that plan with ruthless efficiency. As a bonus action on your turn, you can analyze a target you can see within 60 feet of you. For the next minute, or until you analyze another target, you gain the following benefits:\r\n- When you analyze a hostile creature, your attack and damage rolls made with weapons with the finesse property or blaster weapons against that target may use your Intelligence modifier instead of Strength or Dexterity.\r\n- When you analyze a friendly creature, the target can end your Critical Analysis on them (no action required) to add your Intelligence modifier to one attack roll, ability check, or saving throw. Once a friendly creature has benefited from this ability, they can not do so again until they complete a short or long rest.'
    },
    {
      'name': 'Heavily Armored',
      'description': 'You have trained to master the use of heavy armor, gaining the following benefits:\r\n- You gain proficiency with heavy armor. If you are already proficient with heavy armor, instead increase your Strength score by 1, to a maximum of 20.\r\n- While you are wearing heavy armor, kinetic and energy damage that you take from unenhanced weapons is reduced by an amount equal to your proficiency bonus.'
    },
    {
      'name': 'Motivating Diplomat',
      'description': 'Also at 3rd level, when you are the target of your Critical Analysis feature, you and all allies within 10 feet of you gain a bonus to their AC equal to half your Intelligence modifier (rounded down).'
    },
    {
      'name': 'Resolute',
      'description': 'When you make a saving throw to resist charm and fear effects, you may add your Intelligence modifier to the roll.'
    },
    {
      'name': 'Charming Feint',
      'description': 'Allies within range of your Motivating Diplomat feature also gain a bonus to their damage roll equal to half your Intelligence modifier (rounded down).'
    },
    {
      'name': 'Swift Response',
      'description': 'Beginning at 1st level, you learn to react with swift and decisive action in combat. You gain the following benefits: \r\n- You ignore difficult terrain.\r\n- You add your proficiency bonus to initiative rolls.\r\n- On your first turn during combat, you have advantage on attack rolls against creatures that have not yet acted.'
    },
    {
      'name': 'Ranger\'s Quarry',
      'description': 'Also 1st level, you learn how to effectively read and track your prey. On your turn, you can choose a creature you can see within 90 feet and mark it as your quarry (no action required). For the next 10 minutes, you gain the following benefits:\r\n- Once per round, when you hit the target with a weapon attack, you can deal 1d4 additional damage to it of the same type as the weapon\'s damage. This die changes as you gain scout levels, as shown in the Ranger\'s Quarry Damage Die column of the scout class table.\r\n- You have advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it while it\'s on the same planet as you. \r\n\r\nYou can use this feature a number of times equal to your Intelligence modifier. You regain all expended uses when you finish a short or long rest.',
      'recharge': 'shortRest',
      'uses': {
        'current': 3,
        'maximum': 4
      }
    },
    {
      'name': 'Shielding Fighting Style',
      'description': 'You are skilled at using your shield to defend your allies as well as yourself. While you are wielding a medium or heavy shield with which you are proficient, you gain the following benefits:\r\n- When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll.\r\n- If you are wielding a heavy shield, you are no longer required to wield a weapon with the *light* property in the other hand.'
    },
    {
      'name': 'Mark of the Inquisitor',
      'description': 'Also at 3rd level, when the target of your Ranger\'s Quarry feature is within 15 feet of you, you gain the following benefits:\r\n- Whenever the creature casts a force power, it must first succeed on a Constitution saving throw against your tech save DC to maintain concentration. On a failed save, the casting is disrupted, the force power fails, and the force points are wasted.\r\n- Whenever the creature starts its turn while concentrating on a force power, it must make a Constitution saving throw against your force save DC to maintain concentration. On a failed save, it loses concentration on the power.\r\n\r\nAt 11th level, the radius of this feature increases to 30 feet.'
    }
  ]
}
