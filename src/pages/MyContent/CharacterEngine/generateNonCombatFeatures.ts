import { RawCharacterType } from '@/types/rawCharacterTypes'

export default function generateNonCombatFeatures (rawCharacter: RawCharacterType) {
  return [
    {
      'name': 'Sage Advice',
      'description': 'When you reach 2nd level, you can spend 1 minute spreading your knowledge and experience, advising those around you. When you do so, choose a skill or tool you are proficient with and a number of friendly creatures up to your Intelligence modifier within 30 feet of you who can hear you and who can understand you. Once within the next hour, the next time each creature would make an ability check with the chosen skill or tool, they may add their proficiency bonus to the roll if they are not already proficient. A creature may only benefit from this feature once. If a creature is targeted by this feature again before using it, they can choose to retain the first benefit or replace it with the new skill or tool instead.\r\n\r\nOnce you\'ve used this feature, you can\'t use it again until you finish a long rest. Starting at 13th level, you regain the ability to use it after you complete a short or long rest.',
      'recharge': 'longRest',
      'uses': {
        'current': 1,
        'maximum': 1
      }
    },
    {
      'name': 'Pathfinder',
      'description': 'Beginning at 3rd level, you are skilled at navigating the untamed wilds. You gain the following benefits when traveling for an hour or more:\r\n- Difficult terrain doesn\'t slow your group\'s travel.\r\n- You can\'t become lost by unenhanced means.\r\n- Even when you are engaged in another activity while traveling (such as foraging, navigating, or tracking), you remain alert to danger.\r\n- If you are traveling alone, you can move stealthily at a normal pace.\r\n- When you forage, you find twice as much food as you normally would.\r\n- When you make a Wisdom (Survival) check, you gain a bonus to the check equal to your Intelligence modifier.'
    },
    {
      'name': 'Rustic Hospitality',
      'description': 'Since you are of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you.'
    }
  ]
}
