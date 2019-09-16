import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'

export default function generateCarryingCapacity (rawCharacter: RawCharacterType, abilityScores: AbilityScoresType,) {
  const encumbered = 5 * abilityScores.strength.value
  return {
    encumbered,
    heavilyEncumbered: 2 * encumbered,
    maxCapacity: 3 * encumbered,
    pushDragLift: 6 * encumbered
  }
}
