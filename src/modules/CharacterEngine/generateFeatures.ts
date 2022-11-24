import { FeatureConfigType, RawCharacterType } from '@/types/rawCharacterTypes'
import { FeatureType, BackgroundType } from '@/types/characterTypes'
import { chain, uniqueId, range } from 'lodash'
import { CompletedFeatureType, AbilityScoresType } from '@/types/completeCharacterTypes'

export var FEATURES_WITH_FIGHTING_STYLES = [
  'Archetype-Assault Specialist-Additional Fighting Style-10',
  'Class-Fighter-Fighting Style-1',
  'Class-Guardian-Fighting Style-2',
  'Class-Scout-Fighting Style-2',
  'Fighting Stylist'
]

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
      // found a matching feature config - we will assign it a tempId so we can reference the specific record
      feature.config = remainingFeatureConfigs[configIx]
      // feature.config.localId = uniqueId()
      remainingFeatureConfigs.splice(configIx, 1)
    } else {
      delete feature.config
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
  const myFeatures = chain(features.map(f => JSON.parse(JSON.stringify(f))))
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

  // Any existing raw feature configs will be tagged with localIds when loaded up, this is used to tie back the relationship
  // useful in scenarios where Features are not unique (like Feats taken more than once)
  for (var fc of rawCharacter.featureConfigs) {
    if (!fc.localId) {
      fc.localId = uniqueId()
    }
  }

  let remainingFeatureConfigs: FeatureConfigType[] = JSON.parse(JSON.stringify(rawCharacter.featureConfigs))
  for (var feat of myCompletedFeatures) {
    remainingFeatureConfigs = mapFeatureConfigs(feat, remainingFeatureConfigs)

    if (!feat.metadata) feat.metadata = {}

    if (FEATURES_WITH_FIGHTING_STYLES.indexOf(feat.rowKey) > -1) {
      feat.metadata.fightingStyles = { number: 1 }
    }
  }
  // If any remaining feature configs are still present then they likely need to be trimmed
  rawCharacter.featureConfigs = rawCharacter.featureConfigs.filter(fc => remainingFeatureConfigs.findIndex(o => o.localId === fc.localId) === -1)

  const backgroundWithFeature = rawCharacter.background.name === 'Custom' ? backgrounds.find(({ featureName }) => featureName === rawCharacter.background.feature) : myBackground
  const backgroundFeature = backgroundWithFeature ? {
      name: backgroundWithFeature.featureName,
      combat: false,
      config: undefined,
      text: backgroundWithFeature.featureText,
      source: 'Background',
      sourceName: backgroundWithFeature.name,
      rowKey: backgroundWithFeature.featureName,
      level: undefined
  } : undefined

  return {
    combatFeatures: myCompletedFeatures.filter(({ combat }) => combat),
    nonCombatFeatures: myCompletedFeatures.filter(({ combat }) => !combat),
    backgroundFeature
  }
}
