import { RawCharacterType } from '@/types/rawCharacterTypes'
import { EquipmentType } from '@/types/lootTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { get } from 'lodash'
import applyTweak from '@/utilities/applyTweak'

function getUnarmedStrike (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  proficiencyBonus: number
): EquipmentType {
  const damageDieType: number = get(rawCharacter, 'tweaks.unarmed.damageDice.dieSize') || 0
  const attackBonus = applyTweak(rawCharacter, 'unarmed.toHit', proficiencyBonus + abilityScores.Strength.modifier)
  const damageBonus = applyTweak(rawCharacter, 'unarmed.damage', Math.max(0, 1 + abilityScores.Strength.modifier))
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
    weight: 0,
    description: null,
    modes: [],
    ac: 0,
    armorClassification: '',
    stealthDisadvantage: false,
    strengthRequirement: null
  }
}

export default function generateWeapons (
  rawCharacter: RawCharacterType,
  equipment: EquipmentType[],
  abilityScores: AbilityScoresType,
  proficiencyBonus: number
): EquipmentType[] {
  const equippedWeapons = equipment.filter(({ equipped, equipmentCategory }) => equipped && equipmentCategory === 'Weapon')
  return [ ...equippedWeapons, getUnarmedStrike(rawCharacter, abilityScores, proficiencyBonus) ]
}
