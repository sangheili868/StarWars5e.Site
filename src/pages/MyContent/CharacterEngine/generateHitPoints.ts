import { RawCharacterType } from '@/types/rawCharacterTypes'

export default function generateHitPoints (rawCharacter: RawCharacterType) {
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
