import { RawCharacterType } from '@/types/rawCharacterTypes'
import { pick, compact } from 'lodash'
import { ClassType, PowerType, FeatType, BackgroundType, SpeciesType } from '@/types/characterTypes'
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
import generateFeatures from './generateFeatures'
import generateFeats from './generateFeats'
import {
  experienceTable,
  conditions,
  skills,
  techCastingMap,
  forceCastingMap,
  multiClassProficiencies,
  maneuvers,
  classFeatures,
  archetypeFeatures,
  speciesFeatures,
  feats as gdFeats,
  fightingStyles
} from '@/test/gameData.json'

export default function generateCharacter (
  rawCharacter: RawCharacterType,
  classes: ClassType[],
  species: SpeciesType[],
  equipment: EquipmentType[],
  powers: PowerType[],
  feats: FeatType[],
  backgrounds: BackgroundType[]
) {
  const myClasses = rawCharacter.classes.map(({ name }) => classes.find(myClass => name === myClass.name))
  if (myClasses.includes(undefined)) console.error('Class not found from ' + rawCharacter.classes.map(({ name }) => name))
  const myFoundClasses = compact(myClasses)

  const mySpecies = species.find(({ name }) => name === rawCharacter.species.name)
  if (!mySpecies) console.error('Species not found: ', rawCharacter.species.name)

  const currentLevel = rawCharacter.classes.reduce((acc, { levels }) => acc + levels, 0)
  const proficiencyBonus = 1 + Math.ceil(currentLevel / 4)
  const experiencePoints = {
    previousLevel: experienceTable[currentLevel],
    current: rawCharacter.experiencePoints,
    nextLevel: experienceTable[currentLevel + 1]
  }

  const myFeatsList = generateFeats(rawCharacter)
  const myFeats = myFeatsList.map(name => feats.find(feat => name === feat.name))
  if (myFeats.includes(undefined)) console.error('Feats not found from ' + myFeatsList)
  const myFoundFeats = compact(myFeats)
  const mygdFeats = myFeatsList.map(name => gdFeats.find(feat => name === feat.name))
  const myFoundgdFeats = compact(mygdFeats)
  const abilityScores = generateAbilityScores(rawCharacter, myFoundClasses, mySpecies, proficiencyBonus, skills)
  const myConditions = rawCharacter.currentStats.conditions.map(condition => ({
    name: condition,
    description: (conditions as { [key: string]: string })[condition]
  }))
  const proficiencies = generateProficiencies(rawCharacter, myFoundClasses, myFeatsList, multiClassProficiencies, gdFeats)
  const myEquipment = generateEquipment(rawCharacter, equipment, abilityScores, proficiencyBonus, proficiencies)
  const myBackground = backgrounds.find(({ name }) => name === rawCharacter.background.name)
  const casting = generateCasting(rawCharacter, abilityScores, powers, proficiencyBonus, techCastingMap, forceCastingMap)
  const superiority = generateSuperiorty(rawCharacter, abilityScores, proficiencyBonus, maneuvers)
  const features = generateFeatures(
    rawCharacter,
    classFeatures,
    archetypeFeatures,
    speciesFeatures,
    currentLevel,
    fightingStyles,
    myFoundgdFeats,
    myBackground,
    abilityScores
  )

  return {
    ...pick(rawCharacter, [
      'name',
      'image',
      'user',
      'characteristics'
    ]),
    classes: rawCharacter.classes.map(({ name, levels, archetype }) => ({ name, levels, archetype: archetype && archetype.name })),
    alignment: rawCharacter.characteristics.alignment,
    species: rawCharacter.species.name,
    background: rawCharacter.background.name,
    experiencePoints,
    abilityScores,
    proficiencyBonus,
    ...generateCombatStats(rawCharacter, abilityScores, myEquipment, proficiencyBonus),
    hitPoints: generateHitPoints(rawCharacter, abilityScores, myFoundClasses, currentLevel, casting, superiority, features),
    conditions: myConditions,
    exhaustion: rawCharacter.currentStats.exhaustion,
    proficiencies,
    languages: generateLanguages(rawCharacter),
    equipment: myEquipment,
    credits: Math.max(rawCharacter.credits, 0),
    carryingCapacity: generateCarryingCapacity(abilityScores),
    superiority,
    ...casting,
    ...features
  }
}
