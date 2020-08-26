import { CharacterLootType, AttunementType, isCharacterEnhancedItem } from '@/types/completeCharacterTypes'
import { chain, intersection } from 'lodash'

export default function generateAttunement (
  myEquipment: CharacterLootType[],
  proficiencyBonus: number
): AttunementType {
  const attuneables = myEquipment.filter(isCharacterEnhancedItem).filter(({ requiresAttunement }) => requiresAttunement)
  const current = chain(attuneables)
    .filter('attuned')
    .reduce((acc, item) => isCharacterEnhancedItem(item) && intersection(item.rarityOptions, ['Legendary', 'Artifact']).length > 0 ? 2 + acc : 1 + acc, 0)
    .value()
  return {
    current,
    maximum: proficiencyBonus,
    hasAttunable: attuneables.length > 0
  }
}
