import { RawCharacterType, EquipmentTweakType } from '@/types/rawCharacterTypes'
import { EquipmentType, EnhancedItemType, isWeaponType, isArmorType, WeaponType, damageDieTypes } from '@/types/lootTypes'
import { isEmpty, intersection, camelCase, get } from 'lodash'
import { AbilityScoresType, CharacterLootType } from '@/types/completeCharacterTypes'
import applyTweak, { applyCustomTweak } from '@/utilities/applyTweak'

function isProficientWithWeapon (weapon: WeaponType, proficiencies: string[]) {
  const completeProficiencies = proficiencies.map(proficiency => {
    const split = proficiency.split(' ')
    return ['All', 'all'].includes(split[0]) ? ['Simple ' + split[1], 'Martial ' + split[1]] : proficiency
  }).flat()
  return intersection(completeProficiencies.map(camelCase), [
    weapon.name,
    weapon.name + 's',
    weapon.weaponClassification,
    weapon.weaponClassification + 's'
  ].map(camelCase)).length > 0
}

function getWeaponStats (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  weaponData: WeaponType,
  proficiencyBonus: number,
  proficiencies: string[],
  tweaks: EquipmentTweakType | undefined
) {
  const damageDieType: damageDieTypes = get(tweaks, 'damageDice.dieSize') || weaponData.damageDieType
  const dexModifier = abilityScores['Dexterity'].modifier
  const strModifier = abilityScores['Strength'].modifier
  const isFinesse = weaponData.properties && intersection(weaponData.properties, ['finesse', 'Finesse']).length > 0
  const isBlaster = ['SimpleBlaster', 'MartialBlaster'].includes(weaponData.weaponClassification)

  let weaponModifier
  if (isFinesse) weaponModifier = Math.max(dexModifier, strModifier)
  else if (isBlaster) weaponModifier = dexModifier
  else weaponModifier = strModifier

  const isProficient = isProficientWithWeapon(weaponData, proficiencies) || get(tweaks, 'toHit.proficiency') === 'proficient'
  let attackBonus = weaponModifier + (isProficient ? proficiencyBonus : 0)
  attackBonus = applyTweak(rawCharacter, 'weapon.toHit', attackBonus)
  attackBonus = applyCustomTweak(tweaks && tweaks.toHit, attackBonus)

  let damageBonus = weaponModifier
  damageBonus = applyTweak(rawCharacter, 'weapon.damage', damageBonus)
  damageBonus = applyCustomTweak(tweaks && tweaks.damage, damageBonus)

  return { attackBonus, damageBonus, damageDieType, isCustom: false }
}

export function generateEquipment (
  rawCharacter: RawCharacterType,
  equipment: EquipmentType[],
  enhancedItems: EnhancedItemType[]
): CharacterLootType[]
export default function generateEquipment (
  rawCharacter: RawCharacterType,
  equipment: EquipmentType[],
  enhancedItems: EnhancedItemType[],
  abilityScores?: AbilityScoresType,
  proficiencyBonus?: number,
  proficiencies?: string[]
): CharacterLootType[] {
  const allProficiencies = [...(proficiencies || []), ...rawCharacter.customProficiencies.map(({ name }) => name)]
  return rawCharacter.equipment.map(({ name, category, quantity, equipped, tweaks, attuned }, index) => {
    if (category === 'EnhancedItem') {
      const enhancedItemData = enhancedItems.find(enhancedItem => name === enhancedItem.name)
      if (!enhancedItemData || isEmpty(enhancedItemData)) {
        // Enhanced Item not found
        console.error('Enhanced Item Data Not Found:', name)
        return { name, quantity, index, isFound: false }
      } else {
        // Enhanced Item
        return { ...enhancedItemData, equipped: !!equipped, attuned: !!attuned, quantity, index, isFound: true }
      }
    } else {
      const equipmentData = equipment.find(equipment => name === equipment.name)
      if (!equipmentData || isEmpty(equipmentData)) {
        // Equipment not found
        console.error('Equipment Data Not Found:', name)
        return { name, quantity, index, isFound: false }
      } else if (isWeaponType(equipmentData)) {
        // Weapon
        const weaponStats = abilityScores && getWeaponStats(
          rawCharacter,
          abilityScores,
          equipmentData,
          proficiencyBonus || 0,
          allProficiencies,
          tweaks
        )
        return { ...equipmentData, ...weaponStats, equipped, quantity, index, isFound: true }
      } else if (isArmorType(equipmentData)) {
        // Armor
        return { ...equipmentData, equipped, quantity, index, isFound: true }
      } else {
        // Adventuring Gear
        return { ...equipmentData, quantity, index, isFound: true }
      }
    }
  })
}
