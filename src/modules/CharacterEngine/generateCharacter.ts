import { RawCharacterType } from '@/types/rawCharacterTypes'
import { pick, compact, chain } from 'lodash'
import { ClassType, PowerType, FeatType, BackgroundType, SpeciesType, ArchetypeType, ManeuverType, FeaturesType, FightingStyleType } from '@/types/characterTypes'
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
import applyTweak from '@/utilities/applyTweak'
import { CharacterAdvancementType, SkillType, ConditionType } from '@/types/lookupTypes'

export default function generateCharacter (
  rawCharacter: RawCharacterType,
  classes: ClassType[],
  archetypes: ArchetypeType[],
  species: SpeciesType[],
  equipment: EquipmentType[],
  powers: PowerType[],
  feats: FeatType[],
  backgrounds: BackgroundType[],
  characterAdvancements: CharacterAdvancementType[],
  skills: SkillType[],
  conditions: ConditionType[]
) {
  // To Do
  const maneuvers = [] as ManeuverType[]
  const classFeatures = {} as FeaturesType
  const archetypeFeatures = {} as FeaturesType
  const speciesFeatures = {} as FeaturesType
  const fightingStyles = [] as FightingStyleType[]

  const myClasses = rawCharacter.classes.map(({ name }) => classes.find(myClass => name === myClass.name))
  if (myClasses.includes(undefined)) console.error('Class not found from ' + rawCharacter.classes.map(({ name }) => name))
  const myFoundClasses = compact(myClasses)
  const myArchetypes = compact(rawCharacter.classes.map(({ archetype }) => archetype && archetypes.find(myArchetype => archetype.name === myArchetype.name)))
  const experienceTable = chain(characterAdvancements).keyBy('level').mapValues('experiencePoints').value()
  const skillsMap = chain(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'])
    .keyBy()
    .mapValues(ability => skills.filter(({ baseAttribute }) => ability === baseAttribute).map(({ name }) => name))
    .value()

  const conditionsMap = chain(conditions)
    .keyBy('name')
    .mapValues(({ description }) => description.replace(/\\r\\n/g, '\n'))
    .value()
  const mySpecies = species.find(({ name }) => name === rawCharacter.species.name)
  if (!mySpecies) console.error('Species not found: ', rawCharacter.species.name)

  const currentLevel = rawCharacter.classes.reduce((acc, { levels }) => acc + levels, 0)
  const proficiencyBonus = applyTweak(rawCharacter, 'proficiencyBonus', 1 + Math.ceil(currentLevel / 4))
  const experiencePoints = {
    previousLevel: experienceTable[currentLevel],
    current: rawCharacter.experiencePoints,
    nextLevel: experienceTable[currentLevel + 1]
  }

  const myFeats = generateFeats(rawCharacter, feats)
  const { abilityScores, skillAndSaveProficiencies } = generateAbilityScores(rawCharacter, myFoundClasses, mySpecies, proficiencyBonus, skillsMap)
  const myConditions = rawCharacter.currentStats.conditions.map(condition => ({
    name: condition,
    description: (conditionsMap as { [key: string]: string })[condition]
  }))
  const proficiencies = generateProficiencies(rawCharacter, myFoundClasses, myFeats)
  const myEquipment = generateEquipment(rawCharacter, equipment, abilityScores, proficiencyBonus, proficiencies)
  const myBackground = backgrounds.find(({ name }) => name === rawCharacter.background.name)
  if (!myBackground) console.error('Background not found: ', rawCharacter.background.name)
  const casting = generateCasting(rawCharacter, abilityScores, powers, proficiencyBonus, myFoundClasses, myArchetypes)
  const superiority = generateSuperiorty(rawCharacter, abilityScores, proficiencyBonus, maneuvers)
  const features = generateFeatures(
    rawCharacter,
    classFeatures,
    archetypeFeatures,
    speciesFeatures,
    currentLevel,
    fightingStyles,
    myFeats,
    myBackground as BackgroundType,
    abilityScores
  )

  return {
    ...pick(rawCharacter, [
      'name',
      'image',
      'user',
      'characteristics',
      'tweaks',
      'customProficiencies',
      'customLanguages',
      'customFeatures'
    ]),
    currentLevel,
    classes: rawCharacter.classes.map(({ name, levels, archetype }) => ({ name, levels, archetype: archetype && archetype.name })),
    alignment: rawCharacter.characteristics.alignment,
    species: rawCharacter.species.name,
    background: rawCharacter.background.name,
    experiencePoints,
    abilityScores,
    proficiencyBonus,
    ...generateCombatStats(rawCharacter, abilityScores, myEquipment, proficiencyBonus),
    hitPoints: generateHitPoints(rawCharacter, abilityScores, myFoundClasses, currentLevel, features),
    conditions: myConditions,
    exhaustion: rawCharacter.currentStats.exhaustion,
    proficiencies,
    skillAndSaveProficiencies,
    languages: generateLanguages(rawCharacter),
    equipment: myEquipment,
    credits: Math.max(rawCharacter.credits, 0),
    carryingCapacity: generateCarryingCapacity(abilityScores),
    superiority,
    ...casting,
    ...features
  }
}
