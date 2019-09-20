import { RawCharacterType, RawClassType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { PowerType } from '@/types/characterTypes'
import { chain, concat } from 'lodash'
import { CastingMapType } from '@/types/referenceTypes'

function getMultiplier (multiplierMap: CastingMapType, name: string, archetypeName: string) {
  const multiplierFromClass = (multiplierMap[name] && multiplierMap[name].base)
  const multiplierFromArchetype = (multiplierMap[name] && multiplierMap[name][archetypeName])
  return multiplierFromClass || multiplierFromArchetype || 0
}

function getMaxPowerLevel (classes: RawClassType[], multiplierMap: CastingMapType) {
  const castingLevel = classes.reduce(
    (acc, { name, archetype, levels }) => acc + (levels * getMultiplier(multiplierMap, name, archetype.name)),
    0
  )
  return Math.min(9, Math.ceil(castingLevel / 2))
}

function getPowerPoints (
  classes: RawClassType[],
  multiplierMap: CastingMapType,
  abilityBonus: number,
  castingType: string
) {
  return classes.reduce((acc, { name, archetype, levels }) => {
    const isTech = castingType === 'tech'
    switch (getMultiplier(multiplierMap, name, archetype.name)) {
      case 1 / 3:
        return acc + (isTech ? Math.ceil(levels / 2) : levels)
      case 1 / 2:
        return acc + levels * (isTech ? 1 : 2)
      case 2 / 3:
        return acc + levels * 3
      case 1:
        return acc + levels * (isTech ? 2 : 4)
      default:
        return acc
    }
  }, abilityBonus)
}

function getPowersKnown (rawCharacter: RawCharacterType, powers: PowerType[], castingType: string) {
  return chain(rawCharacter.classes)
    .map(myClass => {
      const powerName = (castingType + 'Powers') as 'techPowers' | 'forcePowers'
      const powerList = concat(myClass[powerName] as string[] || [], myClass.archetype[powerName] || [])
      return powerList.map(myPower => {
        const powerData = powers.find(({ name }) => name === myPower)
        if (!powerData) console.error('Warning: Power not found: ' + myPower)
        return powerData
      })
    })
    .flatten()
    .compact()
    .value()
}

export default function generateCasting (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  powers: PowerType[],
  proficiencyBonus: number,
  techCastingMap: CastingMapType,
  forceCastingMap: CastingMapType
) {
  const techCastingBonus = abilityScores.Intelligence.modifier
  const forceCastingBonus = {
    light: abilityScores.Wisdom.modifier,
    dark: abilityScores.Charisma.modifier,
    universal: Math.max(abilityScores.Wisdom.modifier, abilityScores.Charisma.modifier)
  }
  return {
    techCasting: {
      currentPoints: rawCharacter.currentStats.techPoints,
      maxPoints: getPowerPoints(rawCharacter.classes, techCastingMap, techCastingBonus, 'tech'),
      attackModifier: techCastingBonus + proficiencyBonus,
      saveDC: 8 + techCastingBonus + proficiencyBonus,
      maxPowerLevel: getMaxPowerLevel(rawCharacter.classes, techCastingMap),
      powersKnown: getPowersKnown(rawCharacter, powers, 'tech')
    },
    forceCasting: {
      currentPoints: rawCharacter.currentStats.forcePoints,
      maxPoints: getPowerPoints(rawCharacter.classes, forceCastingMap, forceCastingBonus.universal, 'force'),
      lightAttackModifier: forceCastingBonus.light + proficiencyBonus,
      lightSaveDC: 8 + forceCastingBonus.light + proficiencyBonus,
      darkAttackModifier: forceCastingBonus.dark + proficiencyBonus,
      darkSaveDC: 8 + forceCastingBonus.dark + proficiencyBonus,
      universalAttackModifier: forceCastingBonus.universal + proficiencyBonus,
      universalSaveDC: 8 + forceCastingBonus.universal + proficiencyBonus,
      maxPowerLevel: getMaxPowerLevel(rawCharacter.classes, forceCastingMap),
      powersKnown: getPowersKnown(rawCharacter, powers, 'force')
    }
  }
}
