import { RawCharacterType } from '@/types/rawCharacterTypes'
import { FeatureType, BackgroundType } from '@/types/characterTypes'
import { chain } from 'lodash'
import { CompletedFeatureType, AbilityScoresType } from '@/types/completeCharacterTypes'

function calculateUsage (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  feature: CompletedFeatureType
) {
  if (!feature.usage) {
    return {
      ...feature,
      combat: true
    }
  }
  const maximum = isNaN(feature.usage.maximum) ? abilityScores[feature.usage.maximum].modifier : feature.usage.maximum
  return {
    ...feature,
    usage: {
      recharge: feature.usage.recharge,
      used: rawCharacter.currentStats.featuresTimesUsed[feature.name],
      maximum
    }
  }
}

export default function generateFeatures (
  rawCharacter: RawCharacterType,
  features: FeatureType[],
  currentLevel: number,
  myFeats: CompletedFeatureType[],
  myBackground: BackgroundType | undefined,
  backgrounds: BackgroundType[],
  abilityScores: AbilityScoresType
) : {
  combatFeatures: CompletedFeatureType[],
  nonCombatFeatures: CompletedFeatureType[],
  backgroundFeature: CompletedFeatureType | undefined
} {
  const featureSources = {
    [rawCharacter.species.name]: currentLevel,
    ...chain(rawCharacter.classes).groupBy('name').mapValues(classes => classes[0].levels).value(),
    ...chain(rawCharacter.classes).filter('archetype').groupBy('archetype.name').mapValues(classes => classes[0].levels).value()
  }
  const myFeatures = chain(features)
    .filter(({ sourceName, level }) =>
      Object.keys(featureSources).includes(sourceName) &&
      level <= featureSources[sourceName]
    )
    .sortBy('level')
    .value()
  const myCompletedFeatures = [
    ...myFeatures,
    ...myFeats
  ].map(feature => calculateUsage(rawCharacter, abilityScores, feature as CompletedFeatureType))

  const backgroundWithFeature = rawCharacter.background.name === 'Custom' ? backgrounds.find(({ featureName }) => featureName === rawCharacter.background.feature) : myBackground
  const backgroundFeature = backgroundWithFeature ? {
      name: backgroundWithFeature.featureName,
      combat: false,
      text: backgroundWithFeature.featureText
  } : undefined

  return {
    combatFeatures: myCompletedFeatures.filter(({ combat }) => combat),
    nonCombatFeatures: myCompletedFeatures.filter(({ combat }) => !combat),
    backgroundFeature
  }
}
