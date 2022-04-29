import { EquipmentType } from '@/types/lootTypes'
import { CustomEquipmentType } from '@/types/rawCharacterTypes'

export default function generateEquipmentWeight (
  equipment: EquipmentType[],
  customEquipment: CustomEquipmentType[]
) {
  return [...equipment, ...customEquipment]
    .reduce((sum, item) => {
      let weight = item.weight
      if (typeof weight === 'string') weight = parseInt(weight)
      if (weight) return sum + weight
      return sum
    }, 0)
}
