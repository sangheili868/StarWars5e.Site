import { CompleteCharacterType, isCharacterEnhancedItem, isEquippable, isCharacterGearType, isCharacterValidLootType } from '@/types/completeCharacterTypes'
import { printFieldType } from '@/types/utilityTypes'
import math from 'mathjs'

export default function CharacterPrintPage3 (
  completeCharacter: CompleteCharacterType,
  myClasses: { [key: string]: string }
): printFieldType[] {
  const validEquipment = completeCharacter.equipment.filter(isCharacterValidLootType)
  const equipment = validEquipment.slice(0, 47).map((equipment, index) => [
    { top: 52 + index * 17.8, left: 70, width: 190, myClass: myClasses.openSans + ' text-left', text: name },
    ...(equipment.quantity > 1 ? [{ top: 52 + index * 17.8, left: 264, width: 30, myClass: myClasses.openSans + ' text-left', text: 'x' + equipment.quantity }] : []),
    ...(!isCharacterEnhancedItem(equipment) ? [{
      top: 52 + index * 17.8,
      left: 294 + (isEquippable(equipment) && equipment.equipped ? 0 : 35),
      width: 35,
      fontSize: 10,
      myClass: myClasses.openSans,
      text: equipment.quantity * (math.number(math.fraction(equipment.weight)) as number) + ' lbs.'
    }] : [])
  ]).flat()
  const equippedGear = validEquipment.filter(isEquippable).filter(equipment => equipment.equipped)
  const totalDonned = equippedGear.filter(({ equipped }) => equipped).reduce((sum, { quantity, weight }) => sum + quantity * (math.number(math.fraction(weight)) as number), 0)

  const unequippedGear = [
    ...validEquipment.filter(isCharacterGearType),
    ...validEquipment.filter(isEquippable).filter(({ equipped }) => !equipped)
  ]
  const totalBag = unequippedGear.reduce((sum, { quantity, weight }) => sum + quantity * (math.number(math.fraction(weight)) as number), 0)
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
