import { RawCharacterType } from '@/types/rawCharacterTypes'
import { FightingStyleType, FeatureType, FeaturesType, BackgroundType } from '@/types/characterTypes'
import { compact, groupBy } from 'lodash'

function getValidFeatures (
  features: FeatureType[],
  levelsInClass: number,
  discoveries: { name: string }[] | undefined
) {
  return features && features.filter(({ name: featureName, level, source }) => {
    const isRequiredLevel = level <= levelsInClass
    const isBase = source === 'base'
    const isDiscovery = discoveries &&
      (source === 'discovery') &&
      discoveries.some(({ name: discoveryName }) => discoveryName === featureName)
    return isRequiredLevel && (isBase || isDiscovery)
  })
}

export default function generateCombatFeatures (
  rawCharacter: RawCharacterType,
  classFeatures: FeaturesType,
  archetypeFeatures: FeaturesType,
  fightingStyles: FightingStyleType[],
  myFoundgdFeats: FeatureType[],
  myBackground: BackgroundType
) {
  // todo: usage
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
    {
      name: myBackground.featureName,
      combat: false,
      description: myBackground.featureText
    }
  ]

  return {
    combatFeatures: myFeatures.filter(({ combat }) => combat),
    nonCombatFeatures: myFeatures.filter(({ combat }) => !combat)
  }
}
