import { RawCharacterType } from '@/types/rawCharacterTypes'

const experienceTable = [
  0,
  0,
  300,
  900,
  2700,
  6500,
  14000,
  23000,
  34000,
  48000,
  64000,
  85000,
  100000,
  120000,
  140000,
  165000,
  195000,
  225000,
  265000,
  305000,
  355000
]

export default function generateExperience (rawCharacter: RawCharacterType) {
  const currentLevel = rawCharacter.classes.reduce((acc, { levels }) => acc + levels, 0)
  return {
    previousLevel: experienceTable[currentLevel],
    current: rawCharacter.experiencePoints,
    nextLevel: experienceTable[currentLevel + 1]
  }
}
