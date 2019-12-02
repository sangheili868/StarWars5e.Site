import { RawCharacterType, RawClassType } from '@/types/rawCharacterTypes'
import { AbilityScoresType } from '@/types/completeCharacterTypes'
import { PowerType } from '@/types/characterTypes'
import { chain, concat, get } from 'lodash'
import { CastingMapType } from '@/types/referenceTypes'
import applyTweak from '@/utilities/applyTweak'

function getMultiplier (multiplierMap: CastingMapType, name: string, archetypeName: string | undefined) {
  const multiplierFromClass = (multiplierMap[name] && multiplierMap[name].base)
  const multiplierFromArchetype = (multiplierMap[name] && archetypeName && multiplierMap[name][archetypeName])
  return multiplierFromClass || multiplierFromArchetype || 0
}

function getMaxPowerLevel (rawCharacter: RawCharacterType, multiplierMap: CastingMapType, castingType: string) {
  const castingLevel = rawCharacter.classes.reduce(
    (acc, { name, archetype, levels }) => acc + (levels * getMultiplier(multiplierMap, name, archetype && archetype.name)),
    0
  )
  return applyTweak(rawCharacter, castingType + 'Casting.maxPowerLevel', Math.min(9, Math.ceil(castingLevel / 2)))
}

function getPowerPoints (
  rawCharacter: RawCharacterType,
  multiplierMap: CastingMapType,
  abilityBonus: number,
  castingType: string
) {
  const maxPoints = rawCharacter.classes.reduce((acc, { name, archetype, levels }) => {
    const isTech = castingType === 'tech'
    switch (getMultiplier(multiplierMap, name, archetype && archetype.name)) {
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
  return applyTweak(rawCharacter, castingType + 'Casting.maxPoints', maxPoints)
}

function getPowersKnown (rawCharacter: RawCharacterType, powers: PowerType[], castingType: string) {
  return chain(rawCharacter.classes)
    .map(myClass => {
      const powerName = (castingType + 'Powers') as 'techPowers' | 'forcePowers'
      const powerList = concat(myClass[powerName] as string[] || [], get(myClass, 'archetype.' + powerName) || [])
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
  const techPowers = getPowersKnown(rawCharacter, powers, 'tech')
  const forcePowers = getPowersKnown(rawCharacter, powers, 'force')
  return {
    techCasting: techPowers.length ? {
      currentPoints: rawCharacter.currentStats.techPoints,
      maxPoints: getPowerPoints(rawCharacter, techCastingMap, techCastingBonus, 'tech'),
      attackModifier: applyTweak(rawCharacter, 'techCasting.attackModifier', techCastingBonus + proficiencyBonus),
      saveDC: applyTweak(rawCharacter, 'techCasting.saveDC', 8 + techCastingBonus + proficiencyBonus),
      maxPowerLevel: getMaxPowerLevel(rawCharacter, techCastingMap, 'tech'),
      powersKnown: techPowers
    } : {},
    forceCasting: forcePowers.length ? {
      currentPoints: rawCharacter.currentStats.forcePoints,
      maxPoints: getPowerPoints(rawCharacter, forceCastingMap, forceCastingBonus.universal, 'force'),
      lightAttackModifier: applyTweak(rawCharacter, 'forceCasting.attackModifier', forceCastingBonus.light + proficiencyBonus),
      lightSaveDC: applyTweak(rawCharacter, 'forceCasting.saveDC', 8 + forceCastingBonus.light + proficiencyBonus),
      darkAttackModifier: applyTweak(rawCharacter, 'forceCasting.attackModifier', forceCastingBonus.dark + proficiencyBonus),
      darkSaveDC: applyTweak(rawCharacter, 'forceCasting.saveDC', 8 + forceCastingBonus.dark + proficiencyBonus),
      universalAttackModifier: applyTweak(rawCharacter, 'forceCasting.attackModifier', forceCastingBonus.universal + proficiencyBonus),
      universalSaveDC: applyTweak(rawCharacter, 'forceCasting.saveDC', 8 + forceCastingBonus.universal + proficiencyBonus),
      maxPowerLevel: getMaxPowerLevel(rawCharacter, forceCastingMap, 'force'),
      powersKnown: forcePowers
    } : {}
  }
}
