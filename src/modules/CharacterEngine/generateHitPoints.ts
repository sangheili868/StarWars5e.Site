import { RawCharacterType } from '@/types/rawCharacterTypes'
import { AbilityScoresType, CompletedFeatureType, HitPointsType } from '@/types/completeCharacterTypes'
import { ClassType } from '@/types/characterTypes'
import { chain, isEmpty } from 'lodash'
import applyTweak from '@/utilities/applyTweak'

function getFixedHitPoints (rawCharacter: RawCharacterType, classes: ClassType[]) {
  return rawCharacter.classes.reduce((acc, myClass, index) => {
    const classData = classes.find(({ name }) => name === myClass.name)
    const numberOfLevels = index === 0 ? myClass.levels - 1 : myClass.levels
    return acc + (classData ? classData.hitPointsAtHigherLevelsNumber * numberOfLevels : 0)
  }, 0)
}

export default function generateHitPoints (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  classes: ClassType[],
  currentLevel: number,
  features: { combatFeatures: CompletedFeatureType[], nonCombatFeatures: CompletedFeatureType[]}
): HitPointsType {
  const startingClass = rawCharacter.classes[0]
  const startingClassData = startingClass && classes.find(({ name }) => name === startingClass.name)
  const hpFromFirstLevel = (startingClassData && startingClassData.hitPointsAtFirstLevelNumber) || 0
  const manualHitPoints = rawCharacter.classes.reduce((acc, myClass) => acc + myClass.hitPoints.reduce((hpAcc, value) => hpAcc + value, 0), 0)
  const hpFromLaterLevels = rawCharacter.settings.isFixedHitPoints ? getFixedHitPoints(rawCharacter, classes) : manualHitPoints
  const baseMaximum = hpFromFirstLevel + hpFromLaterLevels + (currentLevel * abilityScores.Constitution.modifier)
  const maximum = applyTweak(rawCharacter, 'hitPoints.maximum', baseMaximum)
  const featuresWithUsage = [ ...features.combatFeatures, ...features.nonCombatFeatures ].filter(({ usage }) => !isEmpty(usage))

  const hitDice = chain(rawCharacter.classes)
    .groupBy(rawClass => {
      const classData = classes.find(({ name }) => name === rawClass.name)
      return classData && classData.hitDiceDieType
    })
    .map((classes, size) => {
      const maximum = classes.reduce((acc, { levels }) => acc + levels, 0)
      const hitDiceUsed = rawCharacter.currentStats.hitDiceUsed['d' + size as 'd6' | 'd8' | 'd10' | 'd12'] || 0
      return ({
        size: 'd' + size,
        current: maximum - hitDiceUsed,
        maximum
      })
    })
    .value()

  const numHitDiceUsed = Object.values(rawCharacter.currentStats.hitDiceUsed).reduce((acc, count) => (acc || 0) + (count || 0), 0) || 0
  let hitDiceToRegain = Math.max(1, Math.floor(currentLevel / 2))
  const hitDiceRestored = chain(rawCharacter.currentStats.hitDiceUsed)
    .map((val, key) => ({ size: key, numUsed: val || 0 }))
    .sortBy(({ size }) => parseInt(size.substr(1)))
    .reverse()
    .map(({ size, numUsed }) => {
      const numRestored = Math.min(numUsed, hitDiceToRegain)
      hitDiceToRegain -= numRestored
      return { size, numRestored }
    })
    .filter(({ numRestored }) => numRestored > 0)
    .value()

  const resting = {
    hitDieBonus: abilityScores.Constitution.modifier,
    numHitDiceUsed,
    hitDiceRestored,
    techPointsUsed: rawCharacter.currentStats.techPointsUsed,
    forcePointsUsed: rawCharacter.currentStats.forcePointsUsed,
    highLevelCasting: rawCharacter.currentStats.highLevelCasting,
    shortRestFeatures: featuresWithUsage.filter(({ usage }) => usage && usage.recharge === 'shortRest').map(({ name }) => name),
    longRestFeatures: featuresWithUsage.map(({ name }) => name)
  }

  return {
    current: Math.max(0, maximum - rawCharacter.currentStats.hitPointsLost),
    temporary: rawCharacter.currentStats.temporaryHitPoints,
    maximum,
    hitDice,
    deathSaves: rawCharacter.currentStats.deathSaves,
    resting
  }
}
