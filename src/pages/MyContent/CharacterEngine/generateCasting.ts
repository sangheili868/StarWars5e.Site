import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { PowerType } from '@/types/characterTypes'

export default function generateCasting (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  powers: PowerType[]
) {
  return {
    'techCasting': {
      'currentPoints': 8,
      'maxPoints': 8,
      'attackModifier': 7,
      'saveDC': 15,
      'powersKnown': [
        {
          'name': 'Electroshock',
          'powerType': 'Tech',
          'prerequisite': null,
          'level': 0,
          'castingPeriod': 'Action',
          'castingPeriodText': '1 action',
          'range': 'Touch',
          'duration': 'Instantaneous',
          'concentration': false,
          'forceAlignment': 'None',
          'description': 'Lightning springs from you to deliver a shock to a creature you try to touch. Make a melee tech attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can\'t take reactions until the start of its next turn.\r\n\r\nThis power\'s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).',
          'higherLevelDescription': null
        },
        {
          'name': 'Encrypted Message',
          'powerType': 'Tech',
          'prerequisite': null,
          'level': 0,
          'castingPeriod': 'Action',
          'castingPeriodText': '1 action',
          'range': '120 feet',
          'duration': '1 round',
          'concentration': false,
          'forceAlignment': 'None',
          'description': 'You point your finger toward a creature within range that possesses a commlink and whisper a message. The target (and only the target) hears the message and can send an encrypted reply that only you can hear. These messages cannot be intercepted or decrypted by unenhanced means.\r\n\r\nYou can cast this power through solid objects if you are familiar with the target and know it is beyond the barrier. 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the power. The power doesn\'t have to follow a straight line and can travel freely around corners or through openings.',
          'higherLevelDescription': null
        },
        {
          'name': 'Alarm',
          'powerType': 'Tech',
          'prerequisite': null,
          'level': 1,
          'castingPeriod': 'Minute',
          'castingPeriodText': '1 minute',
          'range': '30 feet',
          'duration': '8 hours',
          'concentration': false,
          'forceAlignment': 'None',
          'description': 'You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the power ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. When you cast the power, you can designate creatures that won\'t set off the alarm. You also choose whether the alarm is mental or audible. \r\n\r\nA silent alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping.\r\n\r\nAn audible alarm produces the sound of a hand bell for 10 seconds within 60 feet.',
          'higherLevelDescription': null
        },
        {
          'name': 'Stack the Deck',
          'powerType': 'Tech',
          'prerequisite': null,
          'level': 1,
          'castingPeriod': 'Action',
          'castingPeriodText': '1 action',
          'range': '30 feet',
          'duration': 'up to 1 minute',
          'concentration': true,
          'forceAlignment': 'None',
          'description': 'You boost up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the power ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.\r\n\r\n***Overcharge Tech.*** When you cast this power using a tech slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.',
          'higherLevelDescription': null
        },
        {
          'name': 'Tracer Bolt',
          'powerType': 'Tech',
          'prerequisite': null,
          'level': 1,
          'castingPeriod': 'Action',
          'castingPeriodText': '1 action',
          'range': '120 feet',
          'duration': '1 round',
          'concentration': false,
          'forceAlignment': 'None',
          'description': 'A flash of light streaks toward a creature of your choice within range. Make a ranged tech attack against the target. On a hit, the target takes 4d6 energy damage, and the next attack roll made against this target before the end of your next turn has advantage. \r\n\r\n***Overcharge Tech.*** When you cast this power using a tech slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.',
          'higherLevelDescription': null
        },
        {
          'name': 'Denounce',
          'powerType': 'Force',
          'prerequisite': null,
          'level': 0,
          'castingPeriod': 'Action',
          'castingPeriodText': '1 action',
          'range': '30 feet',
          'duration': 'up to 1 minute',
          'concentration': true,
          'forceAlignment': 'Dark',
          'description': 'A target of your choice within range must make a Charisma saving throw. On a failed save, when the target makes their next attack roll or saving throw they must roll a d4 and subtract the number from it. The power then ends.',
          'higherLevelDescription': null
        },
        {
          'name': 'Sense Force',
          'powerType': 'Force',
          'prerequisite': null,
          'level': 1,
          'castingPeriod': 'Action',
          'castingPeriodText': '1 action',
          'range': 'Self',
          'duration': 'up to 10 minutes',
          'concentration': true,
          'forceAlignment': 'Universal',
          'description': 'For the duration, you sense the use of the Force, or its presence in an inanimate object within 30 feet of you. If you sense the Force in this way, you can use your action to determine the direction from which it originates and, if it\'s in line of sight, you see a faint aura around the person or object from which the Force emanates.\r\n\r\n***Force Potency.*** When you cast this power using a 3rd-level force slot, the range increases to 60 feet. When you use a 5th-level force slot, the range increases to 500 feet. When you use a 7th-level force slot, the range increases to 1 mile. When you use a 9th-level force slot, the range increases to 10 miles.',
          'higherLevelDescription': null
        }
      ]
    }
  }
}
