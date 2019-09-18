import { AbilityScoresType } from '@/types/completeCharacterTypes'

export default function generateCarryingCapacity (abilityScores: AbilityScoresType) {
  const encumbered = 5 * abilityScores.Strength.value
  return {
    encumbered,
    heavilyEncumbered: 2 * encumbered,
    maxCapacity: 3 * encumbered,
    pushDragLift: 6 * encumbered
  }
}
