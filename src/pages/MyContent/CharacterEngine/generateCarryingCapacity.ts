import { RawCharacterType } from '@/types/rawCharacterTypes'

export default function generateCarryingCapacity (rawCharacter: RawCharacterType) {
  return {
    encumbered: 80,
    heavilyEncumbered: 160,
    maxCapacity: 240,
    pushDragLift: 480
  }
}
