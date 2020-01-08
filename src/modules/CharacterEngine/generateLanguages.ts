import { RawCharacterType } from '@/types/rawCharacterTypes'
import { compact, get } from 'lodash'

export default function generateLanguages (rawCharacter: RawCharacterType) {
  return compact([
    'Galactic Basic',
    rawCharacter.species.language,
    ...(rawCharacter.background.languages || [])
  ])
}
