import { RawCharacterType } from '@/types/rawCharacterTypes'
import { isEmpty, isEqual } from 'lodash'
import { CharacterValidationType } from '@/types/utilityTypes'

const abilityScores = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma'
]

export default function (character: RawCharacterType): CharacterValidationType {
  return [
    { message: 'No character found', isValid: !isEmpty(character) },
    { message: 'Missing a name', isValid: character.name !== '' },
    { message: 'Missing a species', isValid: character.species && character.species.name !== '' },
    { message: 'Missing class levels', isValid: character.classes && character.classes.length > 0 },
    {
      message: 'Missing hit points for a class',
      isValid: character.classes && character.classes.every((myClass, index) =>
        myClass.hitPoints && myClass.hitPoints.length === myClass.levels - (!index ? 1 : 0)
    ) },
    {
      message: 'Missing an ability score',
      isValid: character.baseAbilityScores &&
        isEqual(Object.keys(character.baseAbilityScores).sort(), abilityScores.sort()) &&
        Object.values(character.baseAbilityScores).every(score => score > 0)
    },
    { message: 'Missing a background', isValid: character.background && character.background.name !== '' },
    {
      message: 'Missing a background feat',
      isValid: character.background && character.background.feat !== undefined && character.background.feat.name !== ''
    }
  ]
    .map((validation, index) => ({ code: index + 1, ...validation }))
    .find(({ isValid }) => !isValid) || { code: 0, message: 'All checks passed', isValid: true }
}
