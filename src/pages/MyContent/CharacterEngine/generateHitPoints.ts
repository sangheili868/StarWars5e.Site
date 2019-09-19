import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { ClassType } from '@/types/characterTypes'
import { chain } from 'lodash'

export default function generateHitPoints (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  classes: ClassType[],
  currentLevel: number
) {
  const startingClass = rawCharacter.classes.find(({ isStartingClass }) => isStartingClass)
  const startingClassData = startingClass && classes.find(({ name }) => name === startingClass.name)
  const hpFromFirstLevel = (startingClassData && startingClassData.hitDiceDieType) || 0
  const hpFromLaterLevels = rawCharacter.classes.reduce((acc, myClass) => acc + myClass.hitPoints.reduce((hpAcc, value) => hpAcc + value, 0), 0)
  const maximum = hpFromFirstLevel + hpFromLaterLevels + (currentLevel * abilityScores.Constitution.modifier)

  const hitDice = chain(rawCharacter.classes)
    .groupBy(rawClass => {
      const classData = classes.find(({ name }) => name === rawClass.name)
      return classData && classData.hitDiceDieType
    })
    .map((classes, size) => ({
      size: 'd' + size,
      current: rawCharacter.currentStats.hitDice['d' + size as 'd6' | 'd8' | 'd10' | 'd12'],
      maximum: classes.reduce((acc, { levels }) => acc + levels, 0)
    }))
    .value()

  return ({
    current: rawCharacter.currentStats.hitPoints,
    maximum,
    hitDice,
    deathSaves: rawCharacter.currentStats.deathSaves
  })
}
