import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { EquipmentType } from '@/types/lootTypes'
import applyTweak from '@/utilities/applyTweak'

function generateArmorClass (rawCharacter: RawCharacterType, abilityScores: AbilityScoresType, equipment: EquipmentType[]) {
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
  return applyTweak(rawCharacter, 'armorClass', bodyAc + shieldAc)
}

function generateSpeed (rawCharacter: RawCharacterType, equipment: EquipmentType[], abilityScores: AbilityScoresType) {
  const tooHeavyArmor = equipment.filter(({ equipmentCategory, equipped, strengthRequirement }) =>
    equipmentCategory === 'Armor' &&
    equipped &&
    strengthRequirement &&
    strengthRequirement.split(' ').length > 1 &&
    parseInt(strengthRequirement.split(' ')[1]) > abilityScores.Strength.value
  )
  const baseSpeed = Math.max(0, applyTweak(rawCharacter, 'speed.base', 30 - (tooHeavyArmor.length * 10)))
  return {
    base: baseSpeed + ' ft',
    hour: baseSpeed / 10 + ' miles',
    day: baseSpeed * 4 / 5 + ' miles',
    special: ''
  }
}

export default function generateCombatStats (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  equipment: EquipmentType[],
  proficiencyBonus: number
) {
  const perceptionModifier = abilityScores.Wisdom.skills.find(({ name }) => name === 'Perception')
  const isScout = rawCharacter.classes.find(({ name }) => name === 'Scout')
  const initiative = abilityScores.Dexterity.modifier + (isScout ? proficiencyBonus : 0)
  const passivePerception = 10 + (perceptionModifier ? perceptionModifier.modifier : 0)

  return {
    initiative: applyTweak(rawCharacter, 'initiative', initiative),
    armorClass: generateArmorClass(rawCharacter, abilityScores, equipment),
    passivePerception: applyTweak(rawCharacter, 'passivePerception', passivePerception),
    inspiration: rawCharacter.currentStats.hasInspiration,
    vision: 'normal',
    speed: generateSpeed(rawCharacter, equipment, abilityScores)
  }
}
