import { RawCharacterType } from '@/types/rawCharacterTypes'
import { EquipmentType } from '@/types/lootTypes'
import { chain, isEmpty, intersection, camelCase } from 'lodash'
import { AbilityScoresType } from '@/types/completeCharacterTypes'

function isProficientWithWeapon (weapon: EquipmentType, proficiencies: string[]) {
  const completeProficiencies = proficiencies.map(proficiency => {
    const split = proficiency.split(' ')
    return split[0] === 'All' ? ['Simple ' + split[1], 'Martial ' + split[1]] : proficiency
  }).flat()
  return intersection(completeProficiencies.map(camelCase), [
    weapon.name,
    weapon.name + 's',
    weapon.weaponClassification,
    weapon.weaponClassification + 's'
  ].map(camelCase)).length > 0
}

function getWeaponStats (
  abilityScores: AbilityScoresType,
  equipmentData: EquipmentType | undefined,
  proficiencyBonus: number,
  proficiencies: string[]
) {
  if (equipmentData && equipmentData.equipmentCategory === 'Weapon') {
    const dexModifier = abilityScores['Dexterity'].modifier
    const strModifier = abilityScores['Strength'].modifier
    const isProficient = isProficientWithWeapon(equipmentData, proficiencies)

    const isBlaster = ['SimpleBlaster', 'MartialBlaster'].includes(equipmentData.weaponClassification)
    let weaponModifier = isBlaster ? dexModifier : strModifier

    const isFinesse = equipmentData.properties && intersection(equipmentData.properties, ['finesse', 'Finesse']).length > 0
    const betterFinesseAbility = dexModifier > strModifier ? dexModifier : strModifier
    weaponModifier = isFinesse ? betterFinesseAbility : weaponModifier

    return {
      attackBonus: weaponModifier + (isProficient ? proficiencyBonus : 0),
      damageBonus: weaponModifier + equipmentData.damageDieModifier
    }
  }
}

export default function generateEquipment (
  rawCharacter: RawCharacterType,
  equipment: EquipmentType[],
  abilityScores: AbilityScoresType,
  proficiencyBonus: number,
  proficiencies: string[]
) {
  return chain(rawCharacter.equipment)
    .filter(({ name }) => name !== 'custom')
    .map(({ name, quantity, equipped }) => {
      const equipmentData = equipment.find(equipment => name === equipment.name)
      if (!equipmentData) console.error('Equipment Data Not Found:', name)
      return {
        name,
        quantity,
        equipped,
        ...(equipmentData || {}),
        ...getWeaponStats(abilityScores, equipmentData, proficiencyBonus, proficiencies),
        isFound: !isEmpty(equipmentData)
      }
    })
    .filter(({ isFound }) => isFound)
    .value() as EquipmentType[]
}
