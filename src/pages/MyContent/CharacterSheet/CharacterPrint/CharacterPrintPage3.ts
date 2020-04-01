import { CompleteCharacterType } from '@/types/completeCharacterTypes'
import { printFieldType } from '@/types/utilityTypes'

export default function CharacterPrintPage3 (
  completeCharacter: CompleteCharacterType,
  myClasses: { [key: string]: string }
): printFieldType[] {
  const equipment = completeCharacter.equipment.slice(0, 47).map(({ name, equipped, quantity, weight }, index) => [
    { top: 52 + index * 17.8, left: 70, width: 190, myClass: myClasses.openSans + ' text-left', text: name },
    ...(quantity > 1 ? [{ top: 52 + index * 17.8, left: 264, width: 30, myClass: myClasses.openSans + ' text-left', text: 'x' + quantity }] : []),
    { top: 52 + index * 17.8, left: 294 + (equipped ? 0 : 35), width: 35, fontSize: 10, myClass: myClasses.openSans, text: quantity * weight + ' lbs.' }
  ]).flat()
  const totalDonned = completeCharacter.equipment.filter(({ equipped }) => equipped).reduce((sum, { quantity, weight }) => sum + quantity * weight, 0)
  const totalBag = completeCharacter.equipment.filter(({ equipped }) => !equipped).reduce((sum, { quantity, weight }) => sum + quantity * weight, 0)
  const totalWeight = totalDonned + totalBag

  return [
    // Left Column
    ...equipment,
    { top: 889, left: 294, width: 35, fontSize: 10, myClass: myClasses.openSans, text: totalDonned + ' lbs.' },
    { top: 889, left: 329, width: 35, fontSize: 10, myClass: myClasses.openSans, text: totalBag + ' lbs.' },
    { top: 905, left: 294, width: 105, myClass: myClasses.openSans, text: totalWeight + ' lbs.' },

    // Right Column
    { top: 86, left: 426, width: 317, text: completeCharacter.credits },
    { top: 943, left: 434, width: 58, text: completeCharacter.carryingCapacity.encumbered + ' lbs.' },
    { top: 943, left: 513, width: 59, text: completeCharacter.carryingCapacity.heavilyEncumbered + ' lbs.' },
    { top: 943, left: 593, width: 59, text: completeCharacter.carryingCapacity.maxCapacity + ' lbs.' },
    { top: 943, left: 675, width: 59, text: completeCharacter.carryingCapacity.pushDragLift + ' lbs.' }
  ]
}
