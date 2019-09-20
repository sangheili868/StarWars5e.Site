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
import generateFeats from './generateFeats'
import {
  experienceTable,
  skills,
  techCastingMap,
  forceCastingMap,
  multiClassProficiencies,
  maneuvers,
  classFeatures,
  archetypeFeatures,
  feats as gdFeats,
  fightingStyles
} from '@/test/gameData.json'

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

  const feats = generateFeats(rawCharacter)
  const abilityScores = generateAbilityScores(rawCharacter, myFoundClasses, proficiencyBonus, skills)
  const proficiencies = generateProficiencies(rawCharacter, myFoundClasses, feats, multiClassProficiencies, gdFeats)
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
    superiority: generateSuperiorty(rawCharacter, abilityScores, proficiencyBonus, maneuvers),
    ...generateCasting(rawCharacter, abilityScores, powers, proficiencyBonus, techCastingMap, forceCastingMap),
    combatFeatures: generateCombatFeatures(rawCharacter, myFoundClasses),
    nonCombatFeatures: generateNonCombatFeatures(rawCharacter, myFoundClasses)
  }
}
