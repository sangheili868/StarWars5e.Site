import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType, CharacterLootType, isCharacterArmorType, CharacterArmorType } from '@/types/completeCharacterTypes'
import applyTweak from '@/utilities/applyTweak'

function generateArmorClass (rawCharacter: RawCharacterType, abilityScores: AbilityScoresType, armor: CharacterArmorType[]) {
  const baseAc = 10 + abilityScores.Dexterity.modifier
  const bodyAc = Math.max(baseAc, ...armor.map(({ armorClassification, ac }) => {
    const armorAC = parseInt((ac || 10).toString())
    switch (armorClassification) {
      case 'Light':
        return armorAC + abilityScores.Dexterity.modifier
      case 'Medium':
        return armorAC + Math.min(2, abilityScores.Dexterity.modifier)
      case 'Heavy':
        return armorAC
      default:
        return 0
    }
  }))
  const shieldAc = Math.max(0, ...armor
    .filter(({ armorClassification }) => armorClassification === 'Shield')
    .map(({ ac }) => parseInt((ac || 0).toString()))
  )
  return applyTweak(rawCharacter, 'armorClass', bodyAc + shieldAc)
}

function generateSpeed (rawCharacter: RawCharacterType, armor: CharacterArmorType[], abilityScores: AbilityScoresType) {
  const tooHeavyArmor = armor.filter(({ propertiesMap }) =>
    propertiesMap.Strength &&
    parseInt(propertiesMap.Strength.replace('strength', '').trim()) > abilityScores.Strength.value
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
  equipment: CharacterLootType[],
  proficiencyBonus: number
) {
  const equippedArmor = equipment.filter(isCharacterArmorType).filter(armor => armor.equipped)
  const armorList = [
    ...equippedArmor,
    ...rawCharacter.customEquipment.filter(({ equipmentCategory }) => equipmentCategory === 'Armor')
  ].map(({ name }) => name)

  const perceptionModifier = abilityScores.Wisdom.skills.find(({ name }) => name === 'Perception')
  const isScout = rawCharacter.classes.find(({ name }) => name === 'Scout')
  const initiative = abilityScores.Dexterity.modifier + (isScout ? proficiencyBonus : 0)
  const passivePerception = 10 + (perceptionModifier ? perceptionModifier.modifier : 0)

  return {
    initiative: applyTweak(rawCharacter, 'initiative', initiative),
    armorClass: generateArmorClass(rawCharacter, abilityScores, equippedArmor),
    armorList,
    passivePerception: applyTweak(rawCharacter, 'passivePerception', passivePerception),
    inspiration: rawCharacter.currentStats.hasInspiration,
    vision: 'normal',
    speed: generateSpeed(rawCharacter, equippedArmor, abilityScores)
  }
}
