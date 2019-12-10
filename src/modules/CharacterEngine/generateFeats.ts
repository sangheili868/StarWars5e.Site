import { RawCharacterType, RawFeatType } from '@/types/rawCharacterTypes'
import { chain, compact } from 'lodash'
import { FeatType } from '@/types/characterTypes'

export default function generateFeats (rawCharacter: RawCharacterType, feats: FeatType[]) {
  const fromClasses = chain(rawCharacter.classes)
    .map(({ abilityScoreImprovements }) => abilityScoreImprovements)
    .compact()
    .flatten()
    .filter(({ type }) => type === 'Feat')
    .map(feat => (feat as RawFeatType).name)
    .value()
  const myFeatsList = [
    ...fromClasses,
    rawCharacter.background.feat && rawCharacter.background.feat.name
  ]
  const myFeats = myFeatsList.map(name => feats.find(feat => name === feat.name))
  if (myFeats.includes(undefined)) console.error('Feats not found from ' + myFeatsList)
  return compact(myFeats)
}
