import { RawCharacterType, HighLevelCastingType } from '@/types/rawCharacterTypes'
import { AbilityScoresType, TechCastingType, ForceCastingType } from '@/types/completeCharacterTypes'
import { PowerType, ClassType, ArchetypeType } from '@/types/characterTypes'
import { chain, concat, get, lowerCase, filter } from 'lodash'
import applyTweak from '@/utilities/applyTweak'

function getMultiplier (
  className: string,
  myClasses: ClassType[],
  archetypeName: string | undefined,
  myArchetypes: ArchetypeType[],
  castingType: 'Tech' | 'Force'
) {
  const myClass = myClasses.find(({ name, casterType }) => (name === className) && (casterType === castingType))
  const myArchetype = archetypeName && myArchetypes.find(
    ({ name, casterType }) => (name === archetypeName) && (casterType === castingType)
  )
  const classMultiplier = myClass ? myClass.casterRatio : 0
  return myArchetype ? myArchetype.casterRatio : classMultiplier
}

function getCastingLevel (
  rawCharacter: RawCharacterType,
  myClasses: ClassType[],
  myArchetypes: ArchetypeType[],
  castingType: 'Tech' | 'Force'
): number {
  return rawCharacter.classes.reduce((acc, { name, archetype, levels }) => acc + (levels * getMultiplier(
    name,
    myClasses,
    archetype && archetype.name,
    myArchetypes,
    castingType
  ) || 0), 0)
}

function getMaxPowerLevel (
  rawCharacter: RawCharacterType,
  castingLevel: number,
  castingType: 'Tech' | 'Force'
) {
  return applyTweak(rawCharacter, lowerCase(castingType) + 'Casting.maxPowerLevel', Math.min(9, Math.ceil(castingLevel / 2)))
}

function getPowerPoints (
  rawCharacter: RawCharacterType,
  myClasses: ClassType[],
  myArchetypes: ArchetypeType[],
  abilityBonus: number,
  castingType: 'Tech' | 'Force'
) {
  const maxPoints = rawCharacter.classes.reduce((acc, { name, archetype, levels }) => {
    const isTech = castingType === 'Tech'
    switch (getMultiplier(name, myClasses, archetype && archetype.name, myArchetypes, castingType)) {
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
  return applyTweak(rawCharacter, lowerCase(castingType) + 'Casting.maxPoints', maxPoints)
}

function findPower (power: string, powers: PowerType[]): PowerType | undefined {
  const powerData = powers.find(({ name }) => name === power)
  if (!powerData) console.error('Warning: Power not found: ' + power)
  return powerData
}

function getPowersKnown (rawCharacter: RawCharacterType, powers: PowerType[], castingType: 'Tech' | 'Force') {
  return chain(rawCharacter.classes)
    .map(myClass => {
      const powerName = (lowerCase(castingType) + 'Powers') as 'techPowers' | 'forcePowers'
      const powerList = concat(myClass[powerName] as string[] || [], get(myClass, 'archetype.' + powerName) || [])
      return powerList.map(power => findPower(power, powers))
    })
    .concat(rawCharacter[`custom${castingType}Powers` as 'customForcePowers' | 'customTechPowers'].map(power => findPower(power, powers)))
    .flatten()
    .compact()
    .value()
}

export default function generateCasting (
  rawCharacter: RawCharacterType,
  abilityScores: AbilityScoresType,
  powers: PowerType[],
  proficiencyBonus: number,
  myClasses: ClassType[],
  myArchetypes: ArchetypeType[]
): {
  techCasting: false | TechCastingType,
  forceCasting: false | ForceCastingType,
  highLevelCasting: HighLevelCastingType
} {
  const techCastingBonus = abilityScores.Intelligence.modifier
  const techCastingLevel = getCastingLevel(rawCharacter, myClasses, myArchetypes, 'Tech')
  const techCasting = {
    pointsUsed: rawCharacter.currentStats.techPointsUsed,
    maxPoints: getPowerPoints(rawCharacter, myClasses, myArchetypes, techCastingBonus, 'Tech'),
    attackModifier: applyTweak(rawCharacter, 'techCasting.attackModifier', techCastingBonus + proficiencyBonus),
    saveDC: applyTweak(rawCharacter, 'techCasting.saveDC', 8 + techCastingBonus + proficiencyBonus),
    maxPowerLevel: getMaxPowerLevel(rawCharacter, techCastingLevel, 'Tech'),
    powersKnown: getPowersKnown(rawCharacter, powers, 'Tech')
  }
  const hasTechCasting = techCastingLevel > 0 || techCasting.powersKnown.length > 0

  const forceCastingBonus = {
    light: abilityScores.Wisdom.modifier,
    dark: abilityScores.Charisma.modifier,
    universal: Math.max(abilityScores.Wisdom.modifier, abilityScores.Charisma.modifier)
  }
  const forceCastingLevel = getCastingLevel(rawCharacter, myClasses, myArchetypes, 'Force')
  const forcePowersKnown = getPowersKnown(rawCharacter, powers, 'Force')

  const forceCasting = {
    pointsUsed: rawCharacter.currentStats.forcePointsUsed,
    maxPoints: getPowerPoints(rawCharacter, myClasses, myArchetypes, forceCastingBonus.universal, 'Force'),
    lightAttackModifier: applyTweak(rawCharacter, 'forceCasting.lightAttackModifier', forceCastingBonus.light + proficiencyBonus),
    lightSaveDC: applyTweak(rawCharacter, 'forceCasting.lightSaveDC', 8 + forceCastingBonus.light + proficiencyBonus),
    darkAttackModifier: applyTweak(rawCharacter, 'forceCasting.darkAttackModifier', forceCastingBonus.dark + proficiencyBonus),
    darkSaveDC: applyTweak(rawCharacter, 'forceCasting.darkSaveDC', 8 + forceCastingBonus.dark + proficiencyBonus),
    universalAttackModifier: applyTweak(rawCharacter, 'forceCasting.universalAttackModifier', forceCastingBonus.universal + proficiencyBonus),
    universalSaveDC: applyTweak(rawCharacter, 'forceCasting.universalSaveDC', 8 + forceCastingBonus.universal + proficiencyBonus),
    maxPowerLevel: getMaxPowerLevel(rawCharacter, forceCastingLevel, 'Force'),
    powersKnown: forcePowersKnown
  }
  const hasForceCasting = forceCastingLevel > 0 || forceCasting.powersKnown.length > 0

  return {
    highLevelCasting: rawCharacter.currentStats.highLevelCasting,
    techCasting: hasTechCasting && techCasting,
    forceCasting: hasForceCasting && forceCasting
  }
}
