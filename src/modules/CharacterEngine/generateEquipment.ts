import { RawCharacterType, EquipmentTweakType } from '@/types/rawCharacterTypes'
import { EquipmentType } from '@/types/lootTypes'
import { chain, isEmpty, intersection, camelCase, get } from 'lodash'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import applyTweak, { applyCustomTweak } from '@/utilities/applyTweak'

function isProficientWithWeapon (weapon: EquipmentType, proficiencies: string[]) {
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
  equipmentData: EquipmentType | undefined,
  proficiencyBonus: number,
  proficiencies: string[],
  tweaks: EquipmentTweakType | undefined
) {
  if (equipmentData && equipmentData.equipmentCategory === 'Weapon') {
    const dexModifier = abilityScores['Dexterity'].modifier
    const strModifier = abilityScores['Strength'].modifier
    const isFinesse = equipmentData.properties && intersection(equipmentData.properties, ['finesse', 'Finesse']).length > 0
    const isBlaster = ['SimpleBlaster', 'MartialBlaster'].includes(equipmentData.weaponClassification)

    let weaponModifier
    if (isFinesse) weaponModifier = Math.max(dexModifier, strModifier)
    else if (isBlaster) weaponModifier = dexModifier
    else weaponModifier = strModifier

    const isProficient = isProficientWithWeapon(equipmentData, proficiencies) || get(tweaks, 'toHit.proficiency') === 'proficient'
    let attackBonus = weaponModifier + (isProficient ? proficiencyBonus : 0)
    attackBonus = applyCustomTweak(tweaks && tweaks.toHit, attackBonus)
    attackBonus = applyTweak(rawCharacter, 'weapon.toHit', attackBonus)

    let damageBonus = weaponModifier + equipmentData.damageDieModifier
    damageBonus = applyCustomTweak(tweaks && tweaks.damage, damageBonus)
    damageBonus = applyTweak(rawCharacter, 'weapon.damage', damageBonus)

    return { attackBonus, damageBonus }
  }
}

export function generateEquipment (rawCharacter: RawCharacterType, equipment: EquipmentType[]): EquipmentType[]
export default function generateEquipment (
  rawCharacter: RawCharacterType,
  equipment: EquipmentType[],
  abilityScores?: AbilityScoresType,
  proficiencyBonus?: number,
  proficiencies?: string[]
): EquipmentType[] {
  const allProficiencies = [...(proficiencies || []), ...rawCharacter.customProficiencies.map(({ name }) => name)]
  return chain(rawCharacter.equipment)
    .filter(({ name }) => name !== 'custom')
    .map(({ name, quantity, equipped, tweaks }) => {
      const equipmentData = equipment.find(equipment => name === equipment.name)
      if (!equipmentData) console.error('Equipment Data Not Found:', name)
      const weaponStats = abilityScores && getWeaponStats(
        rawCharacter,
        abilityScores,
        equipmentData,
        proficiencyBonus || 0,
        allProficiencies,
        tweaks
      )
      return {
        name,
        quantity,
        equipped,
        ...(equipmentData || {}),
        ...weaponStats,
        isFound: !isEmpty(equipmentData)
      }
    })
    .filter(({ isFound }) => isFound)
    .value() as EquipmentType[]
}
