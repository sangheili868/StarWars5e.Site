import { RawCharacterType, CustomEquipmentType } from '@/types/rawCharacterTypes'
import { EquipmentType } from '@/types/lootTypes'
import { AbilityScoresType, CustomWeaponType } from '@/types/completeCharacterTypes'
import { get } from 'lodash'
import applyTweak, { applyCustomTweak } from '@/utilities/applyTweak'

function getUnarmedStrike (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  proficiencyBonus: number
): EquipmentType {
  const damageDieType: number = get(rawCharacter, 'tweaks.unarmed.damageDice.dieSize') || 0
  const damageBase = damageDieType > 0 ? 0 : 1
  const attackBonus = applyTweak(rawCharacter, 'unarmed.toHit', proficiencyBonus + abilityScores.Strength.modifier)
  const damageBonus = applyTweak(rawCharacter, 'unarmed.damage', Math.max(0, damageBase + abilityScores.Strength.modifier))
  return {
    index: -1,
    contentType: 'Core',
    contentSource: 'PHB',
    cost: 0,
    equipped: true,
    quantity: 0,
    attackBonus,
    damageBonus,
    damageDieModifier: 1,
    damageDieType,
    damageNumberOfDice: 1,
    damageType: 'kinetic',
    equipmentCategory: 'weapon',
    name: 'Unarmed Strike',
    properties: [],
    weaponClassification: '',
    weight: '0',
    description: null,
    modes: [],
    ac: 0,
    armorClassification: '',
    stealthDisadvantage: false,
    strengthRequirement: null
  }
}

function getCustomWeaponStats (
  customEquipment: CustomEquipmentType,
  rawCharacter: RawCharacterType,
  index: number
) {
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
  equipment: EquipmentType[],
  abilityScores: AbilityScoresType,
  proficiencyBonus: number
): (EquipmentType | CustomWeaponType)[] {
  const equippedWeapons = equipment.filter(({ equipped, equipmentCategory }) => equipped && equipmentCategory === 'Weapon')
  const equippedCustomWeapons = rawCharacter.customEquipment
    .map((customEquipment, index) => getCustomWeaponStats(customEquipment, rawCharacter, index))
    .filter(({ equipped, equipmentCategory }) => equipped && equipmentCategory === 'Weapon')
  return [
    ...equippedWeapons,
    ...equippedCustomWeapons,
    getUnarmedStrike(rawCharacter, abilityScores, proficiencyBonus)
  ]
}
