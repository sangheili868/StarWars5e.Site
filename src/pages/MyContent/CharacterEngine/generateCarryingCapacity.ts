import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'

export default function generateCarryingCapacity (rawCharacter: RawCharacterType, abilityScores: AbilityScoresType,) {
  return {
    encumbered: 80,
    heavilyEncumbered: 160,
    maxCapacity: 240,
    pushDragLift: 480
  }
}
