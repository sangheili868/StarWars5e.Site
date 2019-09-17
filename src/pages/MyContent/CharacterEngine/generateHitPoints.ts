import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { ClassType } from '@/types/characterTypes'

export default function generateHitPoints (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  classes: ClassType[]
) {
  // TO DO
  return {
    'maximum': 42,
    'current': 34,
    'temporary': 0,
    'hitDice': [
      {
        'size': 'd8',
        'current': 1,
        'maximum': 3
      },
      {
        'size': 'd10',
        'current': 4,
        'maximum': 4
      }
    ],
    'deathSaves': {
      'successes': 0,
      'failures': 0
    }
  }
}
