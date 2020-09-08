import { RawCharacterType, CustomEquipmentType } from '@/types/rawCharacterTypes'
import { damageDieTypes } from '@/types/lootTypes'
import { AbilityScoresType, CustomWeaponType, isCharacterWeaponType, CharacterLootType, CharacterWeaponType } from '@/types/completeCharacterTypes'
import { get } from 'lodash'
import applyTweak, { applyCustomTweak } from '@/utilities/applyTweak'

function getUnarmedStrike (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  proficiencyBonus: number
): CharacterWeaponType {
  const damageDieType: damageDieTypes = get(rawCharacter, 'tweaks.unarmed.damageDice.dieSize') || 0
  const damageBase = damageDieType > 0 ? 0 : 1
  const attackBonus = applyTweak(rawCharacter, 'unarmed.toHit', proficiencyBonus + abilityScores.Strength.modifier)
  const damageBonus = applyTweak(rawCharacter, 'unarmed.damage', Math.max(0, damageBase + abilityScores.Strength.modifier))
  return {
    name: 'Unarmed Strike',
    description: null,
    cost: 0,
    weight: '0',
    equipmentCategory: 'Weapon',
    contentType: 'Core',
    contentSource: 'PHB',
    damageNumberOfDice: 1,
    damageType: 'Kinetic',
    weaponClassification: 'Unarmed',
    damageDieType,
    properties: [],
    propertiesMap: {},
    modes: [],
    quantity: 0,
    index: -1,
    isFound: true,
    equipped: true,
    attackBonus,
    damageBonus,
    isCustom: false
  }
}

function getCustomWeaponStats (
  customEquipment: CustomEquipmentType,
  rawCharacter: RawCharacterType,
  index: number
): CustomWeaponType {
    const tweaks = customEquipment.tweaks
    let attackBonus = 0
    attackBonus = applyTweak(rawCharacter, 'weapon.toHit', attackBonus)
    attackBonus = applyCustomTweak(tweaks && tweaks.toHit, attackBonus)

    let damageBonus = 0
    damageBonus = applyTweak(rawCharacter, 'weapon.damage', damageBonus)
    damageBonus = applyCustomTweak(tweaks && tweaks.damage, damageBonus)
  return {
    ...customEquipment,
    attackBonus,
    damageBonus,
    index,
    properties: [],
    isCustom: true,
    damageDieType: get(tweaks, 'damageDice.dieSize') || 4
  }
}

export default function generateWeapons (
  rawCharacter: RawCharacterType,
  equipment: CharacterLootType[],
  abilityScores: AbilityScoresType,
  proficiencyBonus: number
): (CharacterWeaponType | CustomWeaponType)[] {
  const equippedWeapons = equipment.filter(isCharacterWeaponType).filter(({ equipped }) => equipped)
  const equippedCustomWeapons: CustomWeaponType[] = rawCharacter.customEquipment
    .filter(({ equipped, equipmentCategory }) => equipped && equipmentCategory === 'Weapon')
    .map((customEquipment, index) => getCustomWeaponStats(customEquipment, rawCharacter, index))
  return [
    ...equippedWeapons,
    ...equippedCustomWeapons,
    getUnarmedStrike(rawCharacter, abilityScores, proficiencyBonus)
  ]
}
