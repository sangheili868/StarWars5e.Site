import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { EquipmentType } from '@/types/lootTypes'

export default function generateCombatStats (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  equipment: EquipmentType[]
) {
  return {
    proficiencyBonus: 3,
    initiative: 4,
    armorClass: 19,
    passivePerception: 9,
    inspiration: false,
    vision: 'normal',
    speed: {
      base: '30ft',
      hour: '3 miles',
      day: '24 miles',
      special: ''
    }
  }
}
