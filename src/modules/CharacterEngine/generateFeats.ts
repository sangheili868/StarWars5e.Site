import { RawCharacterType, RawFeatType } from '@/types/rawCharacterTypes'
import { chain } from 'lodash'
import { FeatType } from '@/types/characterTypes'
import { CompletedFeatureType } from '@/types/completeCharacterTypes'

function findFeats (myFeats: string[], feats: FeatType[], isCustom: boolean): (CompletedFeatureType)[] {
  return chain(myFeats).map((name, index) => {
    const foundFeat = feats.find(feat => name === feat.name)
    if (!foundFeat) console.error('Feat not found: ' + name)
    else {
      return {
        ...foundFeat,
        customIndex: isCustom ? index : -1,
        combat: true,
        config: undefined
      }
    }
  }).compact().value()
}

export default function generateFeats (rawCharacter: RawCharacterType, feats: FeatType[]): CompletedFeatureType[] {
  const fromClasses = chain(rawCharacter.classes)
    .map(({ abilityScoreImprovements }) => abilityScoreImprovements)
    .compact()
    .flatten()
    .filter(({ type }) => type === 'Feat')
    .map(feat => (feat as RawFeatType).name)
    .value()
  const myFeatsList = [
    ...fromClasses,
    ...(rawCharacter.background.feat && rawCharacter.background.feat.name ? [rawCharacter.background.feat.name] : [])
  ]
  return [
    ...findFeats(myFeatsList, feats, false),
    ...findFeats(rawCharacter.customFeats || [], feats, true)
  ]
}
