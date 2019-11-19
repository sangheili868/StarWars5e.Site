import { RawCharacterType, RawFeatType } from '@/types/rawCharacterTypes'
import { chain } from 'lodash'

export default function generateFeats (rawCharacter: RawCharacterType) {
  const fromClasses = chain(rawCharacter.classes)
    .map(({ abilityScoreImprovements }) => abilityScoreImprovements)
    .compact()
    .flatten()
    .filter(({ type }) => type === 'feat')
    .map(feat => (feat as RawFeatType).name)
    .value()
  return [
    ...fromClasses,
    rawCharacter.background.feat.name
  ]
}
