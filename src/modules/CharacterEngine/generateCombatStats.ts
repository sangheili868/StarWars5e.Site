import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { EquipmentType } from '@/types/lootTypes'

function generateArmorClass (abilityScores: AbilityScoresType, equipment: EquipmentType[]) {
  const equippedArmor = equipment.filter(({ equipmentCategory, equipped }) => equipmentCategory === 'Armor' && equipped)
  const baseAc = 10 + abilityScores.Dexterity.modifier
  const bodyAc = Math.max(baseAc, ...equippedArmor.map(({ armorClassification, ac }) => {
    const safeAc = parseInt((ac || 10).toString())
    switch (armorClassification) {
      case 'Light':
        return safeAc + abilityScores.Dexterity.modifier
      case 'Medium':
        return safeAc + Math.min(2, abilityScores.Dexterity.modifier)
      case 'Heavy':
        return safeAc
      default:
        return 0
    }
  }))
  const shieldAc = Math.max(0, ...equippedArmor
    .filter(({ armorClassification }) => armorClassification === 'Shield')
    .map(({ ac }) => parseInt((ac || 0).toString()))
  )
  return bodyAc + shieldAc
}

export default function generateCombatStats (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  equipment: EquipmentType[],
  proficiencyBonus: number
) {
  const perceptionModifier = abilityScores.Wisdom.skills.find(({ name }) => name === 'Perception')
  const isScout = rawCharacter.classes.find(({ name }) => name === 'Scout')
  return {
    initiative: abilityScores.Dexterity.modifier + (isScout ? proficiencyBonus : 0),
    armorClass: generateArmorClass(abilityScores, equipment),
    passivePerception: 10 + (perceptionModifier ? perceptionModifier.modifier : 0),
    inspiration: rawCharacter.currentStats.hasInspiration,
    vision: 'normal',
    speed: {
      base: '30ft',
      hour: '3 miles',
      day: '24 miles',
      special: ''
    }
  }
}
