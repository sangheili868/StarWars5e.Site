import { FeatureConfigType, RawCharacterType } from '@/types/rawCharacterTypes'
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

// Combines rawCharacter.featureConfig with real feature data for easy consumption. When a featureConfig is matched it is removed from the pool
export function mapFeatureConfigs (
  feature: CompletedFeatureType | FeatureType,
  remainingFeatureConfigs: FeatureConfigType[]) {
  if (remainingFeatureConfigs.length > 0) {
    // if there are any remaining feature configs then lets try to map it
    let configIx = remainingFeatureConfigs.findIndex(f => f.featureRowKey === (feature as any).rowKey)
    if (configIx > -1) {
      // found a matching feature config
      feature.config = remainingFeatureConfigs[configIx]
      remainingFeatureConfigs = remainingFeatureConfigs.slice(configIx, 1)
    } else {
      feature.config = null
    }
  }
  return remainingFeatureConfigs
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
    .reverse()
    .uniqBy(({ name, sourceName }) => name + sourceName)
    .reverse()
    .value()
  const myCompletedFeatures = [
    ...myFeatures,
    ...myFeats
  ].map(feature => calculateUsage(rawCharacter, abilityScores, feature as CompletedFeatureType))

  let remainingFeatureConfigs: FeatureConfigType[] = JSON.parse(JSON.stringify(rawCharacter.featureConfigs))
  for (var feat of myCompletedFeatures) {
    remainingFeatureConfigs = mapFeatureConfigs(feat, remainingFeatureConfigs)
  }

  const backgroundWithFeature = rawCharacter.background.name === 'Custom' ? backgrounds.find(({ featureName }) => featureName === rawCharacter.background.feature) : myBackground
  const backgroundFeature = backgroundWithFeature ? {
      name: backgroundWithFeature.featureName,
      combat: false,
      config: null,
      text: backgroundWithFeature.featureText
  } : undefined

  return {
    combatFeatures: myCompletedFeatures.filter(({ combat }) => combat),
    nonCombatFeatures: myCompletedFeatures.filter(({ combat }) => !combat),
    backgroundFeature
  }
}
