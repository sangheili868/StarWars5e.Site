import { RawCharacterType } from '@/types/rawCharacterTypes'
import { CharacterAdvancementType } from '@/types/lookupTypes'
import { chain } from 'lodash'

export default function generateExperiencePoints (
  rawCharacter: RawCharacterType,
  characterAdvancements: CharacterAdvancementType[],
  currentLevel: number
) {
  const experienceTable = chain(characterAdvancements).keyBy('level').mapValues('experiencePoints').value()
  const previousLevel = experienceTable[currentLevel]
  const current = rawCharacter.experiencePoints
  const isMax = currentLevel === 20
  const nextLevel = isMax ? experienceTable[20] : experienceTable[currentLevel + 1]
  const isCorrect = current >= previousLevel && (isMax || current < nextLevel)
  let errorMessage = ''
  if (current < previousLevel) errorMessage = 'Experience too low. Increase experience or remove class levels below'
  else if (!isMax && (current >= nextLevel)) errorMessage = 'You have unused levels. Click below to add more class levels.'
  return { previousLevel, current: rawCharacter.experiencePoints, nextLevel, isCorrect, errorMessage }
}
