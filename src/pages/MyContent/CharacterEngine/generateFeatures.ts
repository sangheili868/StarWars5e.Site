import { RawCharacterType } from '@/types/rawCharacterTypes'
import { FightingStyleType, FeatureType, FeaturesType, BackgroundType } from '@/types/characterTypes'
import { compact } from 'lodash'
import { CompletedFeatureType, AbilityScoresType } from '@/types/completeCharacterTypes'

function getValidFeatures (
  features: FeatureType[],
  levelsInClass: number,
  discoveries: { name: string }[] | undefined
) {
  return features && features.filter(({ name: featureName, level, type }) => {
    const isRequiredLevel = level <= levelsInClass
    const isBase = type === 'base'
    const isDiscovery = discoveries &&
      (type === 'discovery') &&
      discoveries.some(({ name: discoveryName }) => discoveryName === featureName)
    return isRequiredLevel && (isBase || isDiscovery)
  })
}

function calculateUsage (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  feature: CompletedFeatureType
) {
  if (!feature.usage) return feature
  const maximum = isNaN(feature.usage.maximum) ? abilityScores[feature.usage.maximum].modifier : feature.usage.maximum
  return {
    ...feature,
    usage: {
      recharge: feature.usage.recharge,
      current: rawCharacter.currentStats.featureUses[feature.name],
      maximum
    }
  }
}

export default function generateFeatures (
  rawCharacter: RawCharacterType,
  classFeatures: FeaturesType,
  archetypeFeatures: FeaturesType,
  speciesFeatures: FeaturesType,
  currentLevel: number,
  fightingStyles: FightingStyleType[],
  myFoundgdFeats: FeatureType[],
  myBackground: BackgroundType,
  abilityScores: AbilityScoresType
) {
  const mySpeciesFeatures = getValidFeatures(speciesFeatures[rawCharacter.species.name], currentLevel)
  const myClassFeatures = rawCharacter.classes.map(({ name: className, levels, discoveries }) =>
    getValidFeatures(classFeatures[className], levels, discoveries)
  ).flat()
  const myArchetypeFeatures = rawCharacter.classes.map(({ archetype, levels, discoveries }) =>
    archetype && getValidFeatures(archetypeFeatures[archetype.name], levels, discoveries)
  ).flat()
  const myFightingStyles = compact(rawCharacter.classes
    .map(({ fightingStyle }) => fightingStyles.find(({ name }) => name === fightingStyle))
  )
  const myFeatures = [
    ...myClassFeatures,
    ...myArchetypeFeatures,
    ...myFoundgdFeats,
    ...myFightingStyles,
    ...mySpeciesFeatures,
    {
      name: myBackground.featureName,
      combat: false,
      description: myBackground.featureText
    }
  ].map(feature => calculateUsage(rawCharacter, abilityScores, feature))

  return {
    combatFeatures: myFeatures.filter(({ combat }) => combat),
    nonCombatFeatures: myFeatures.filter(({ combat }) => !combat)
  }
}
