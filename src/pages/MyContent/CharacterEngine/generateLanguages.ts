import { RawCharacterType } from '@/types/rawCharacterTypes'
import { compact } from 'lodash'

export default function generateLanguages (rawCharacter: RawCharacterType) {
  return compact([
    'Galactic Basic',
    rawCharacter.species.language,
    ...(rawCharacter.background.languages || []),
    ...rawCharacter.classes.map(({ archetype }) => archetype.silverTongue && archetype.silverTongue.language)
  ])
}
