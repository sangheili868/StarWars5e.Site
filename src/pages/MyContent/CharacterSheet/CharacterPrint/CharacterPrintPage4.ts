import { CompleteCharacterType } from '@/types/completeCharacterTypes'
import addPlus from '@/utilities/addPlus'
import { printFieldType } from '@/types/utilityTypes'

function powersOfLevel (completeCharacter: CompleteCharacterType, level: number, top: number, max: number) {
  const techPowers = completeCharacter.techCasting ? completeCharacter.techCasting.powersKnown
    .filter(power => power.level === level)
    .map(({ name }) => name) : []
  const forcePowers = completeCharacter.forceCasting ? completeCharacter.forceCasting.powersKnown
    .filter(power => power.level === level)
    .map(({ name }) => name) : []
  return [ ...techPowers, ...forcePowers ].map((text, index) => ({
    top: top + 18 * index,
    left: 84 + 352 * (level % 2),
    width: 310,
    myClass: 'text-left',
    text
  })).slice(0, max)
}

export default function CharacterPrintPage4 (completeCharacter: CompleteCharacterType): printFieldType[][] {
  return completeCharacter.techCasting || completeCharacter.forceCasting ? [[
    ...completeCharacter.techCasting ? [
      { top: 45, left: 71, width: 135, text: completeCharacter.techCasting.maxPoints },
      { top: 35, left: 368, width: 63, text: addPlus(completeCharacter.techCasting.attackModifier) },
      { top: 35, left: 538, width: 63, text: completeCharacter.techCasting.saveDC }
    ] : [],
    ...completeCharacter.forceCasting ? [
      { top: 45, left: 610, width: 135, text: completeCharacter.forceCasting.maxPoints },
      { top: 59, left: 368, width: 63, text: addPlus(completeCharacter.forceCasting.universalAttackModifier) },
      { top: 59, left: 538, width: 63, text: completeCharacter.forceCasting.universalSaveDC },
      { top: 82, left: 368, width: 63, text: addPlus(completeCharacter.forceCasting.lightAttackModifier) },
      { top: 82, left: 538, width: 63, text: completeCharacter.forceCasting.lightSaveDC },
      { top: 105, left: 368, width: 63, text: addPlus(completeCharacter.forceCasting.darkAttackModifier) },
      { top: 105, left: 538, width: 63, text: completeCharacter.forceCasting.darkSaveDC },
      { top: 129, left: 368, width: 63, text: addPlus(completeCharacter.forceCasting.universalAttackModifier) },
      { top: 129, left: 538, width: 63, text: completeCharacter.forceCasting.universalSaveDC }
    ] : [],
    ...powersOfLevel(completeCharacter, 0, 168, 11),
    ...powersOfLevel(completeCharacter, 1, 168, 11),
    ...powersOfLevel(completeCharacter, 2, 386, 9),
    ...powersOfLevel(completeCharacter, 3, 386, 9),
    ...powersOfLevel(completeCharacter, 4, 569, 8),
    ...powersOfLevel(completeCharacter, 5, 569, 8),
    ...powersOfLevel(completeCharacter, 6, 734, 7),
    ...powersOfLevel(completeCharacter, 7, 734, 7),
    ...powersOfLevel(completeCharacter, 8, 880, 7),
    ...powersOfLevel(completeCharacter, 9, 880, 7)
  ]] : []
}
