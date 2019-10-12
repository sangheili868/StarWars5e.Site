import { RawCharacterType } from '@/types/rawCharacterTypes'
import { pick, compact } from 'lodash'
import { ClassType, PowerType, FeatType, BackgroundType } from '@/types/characterTypes'
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
  equipment: EquipmentType[],
  powers: PowerType[],
  feats: FeatType[],
  backgrounds: BackgroundType[]
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
  const credits = rawCharacter.credits

  const myFeatsList = generateFeats(rawCharacter)
  const myFeats = myFeatsList.map(name => feats.find(feat => name === feat.name))
  if (myFeats.includes(undefined)) console.error('Feats not found from ' + myFeatsList)
  const myFoundFeats = compact(myFeats)
  const mygdFeats = myFeatsList.map(name => gdFeats.find(feat => name === feat.name))
  const myFoundgdFeats = compact(mygdFeats)
  const abilityScores = generateAbilityScores(rawCharacter, myFoundClasses, proficiencyBonus, skills)
  const proficiencies = generateProficiencies(rawCharacter, myFoundClasses, myFeatsList, multiClassProficiencies, gdFeats)
  const myEquipment = generateEquipment(rawCharacter, equipment, abilityScores, proficiencyBonus, proficiencies)
  const myBackground = backgrounds.find(({ name }) => name === rawCharacter.background.name)

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
    ...generateCombatStats(rawCharacter, abilityScores, myEquipment),
    hitPoints: generateHitPoints(rawCharacter, abilityScores, myFoundClasses, currentLevel),
    proficiencies,
    languages: generateLanguages(rawCharacter),
    equipment: myEquipment,
    credits: credits ? credits.quantity : 0,
    carryingCapacity: generateCarryingCapacity(abilityScores),
    superiority: generateSuperiorty(rawCharacter, abilityScores, proficiencyBonus, maneuvers),
    ...generateCasting(rawCharacter, abilityScores, powers, proficiencyBonus, techCastingMap, forceCastingMap),
    ...generateFeatures(
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
  }
}
