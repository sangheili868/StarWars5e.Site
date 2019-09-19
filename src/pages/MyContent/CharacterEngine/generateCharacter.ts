import { RawCharacterType } from '@/types/rawCharacterTypes'
import { pick, compact } from 'lodash'
import { ClassType, PowerType } from '@/types/characterTypes'
import { EquipmentType } from '@/types/lootTypes'
import generateAbilityScores from './generateAbilityScores'
import generateCombatStats from './generateCombatStats'
import generateHitPoints from './generateHitPoints'
import generateProficiencies from './generateProficiencies'
import generateLanguages from './generateLanguages'
import generateEquipment from './generateEquipment'
import generateCarryingCapacity from './generateCarryingCapacity'
import generateSuperiorty from './generateSuperiority'
import generateCasting from './generateCasting'
import generateCombatFeatures from './generateCombatFeatures'
import generateNonCombatFeatures from './generateNonCombatFeatures'

const experienceTable = [
  0,
  0,
  300,
  900,
  2700,
  6500,
  14000,
  23000,
  34000,
  48000,
  64000,
  85000,
  100000,
  120000,
  140000,
  165000,
  195000,
  225000,
  265000,
  305000,
  355000
]

export default function generateCharacter (
  rawCharacter: RawCharacterType,
  classes: ClassType[],
  equipment: EquipmentType[],
  powers: PowerType[]
) {
  const myClasses = rawCharacter.classes.map(({ name }) => classes.find(myClass => name === myClass.name))
  if (myClasses.includes(undefined)) console.error('Class not found from ' + rawCharacter.classes.map(({ name }) => name))
  const myFoundClasses = compact(myClasses)

  const currentLevel = rawCharacter.classes.reduce((acc, { levels }) => acc + levels, 0)
  const proficiencyBonus = 1 + Math.ceil(currentLevel / 4)
  const experiencePoints = {
    previousLevel: experienceTable[currentLevel],
    current: rawCharacter.experiencePoints,
    nextLevel: experienceTable[currentLevel + 1]
  }
  const credits = rawCharacter.equipment.find(({ name }) => name === 'credits')

  const abilityScores = generateAbilityScores(rawCharacter, myFoundClasses, proficiencyBonus)
  const proficiencies = generateProficiencies(rawCharacter, myFoundClasses)
  const myEquipment = generateEquipment(rawCharacter, equipment, abilityScores, proficiencyBonus, proficiencies)

  return {
    ...pick(rawCharacter, [
      'name',
      'image',
      'user',
      'characteristics'
    ]),
    classes: rawCharacter.classes.map(({ name, levels, archetype }) => ({ name, levels, archetype: archetype.name })),
    alignment: rawCharacter.characteristics.alignment,
    species: rawCharacter.species.name,
    background: rawCharacter.background.name,
    experiencePoints,
    abilityScores,
    proficiencyBonus,
    ...generateCombatStats(rawCharacter, abilityScores, myEquipment),
    hitPoints: generateHitPoints(rawCharacter, abilityScores, myFoundClasses, currentLevel),
    proficiencies,
    languages: generateLanguages(rawCharacter),
    equipment: myEquipment,
    credits: credits && credits.quantity,
    carryingCapacity: generateCarryingCapacity(abilityScores),
    superiority: generateSuperiorty(rawCharacter, abilityScores, myFoundClasses),
    ...generateCasting(rawCharacter, abilityScores, powers, proficiencyBonus),
    combatFeatures: generateCombatFeatures(rawCharacter, myFoundClasses),
    nonCombatFeatures: generateNonCombatFeatures(rawCharacter, myFoundClasses)
  }
}
