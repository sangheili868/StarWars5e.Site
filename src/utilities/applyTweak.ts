import { RawCharacterType, TweakType } from '@/types/rawCharacterTypes'
import { get, isFinite } from 'lodash'

export default function (rawCharacter: RawCharacterType, tweakPath: string, calculatedValue: number) {
  return applyCustomTweak(get(rawCharacter.tweaks, tweakPath) || {}, calculatedValue)
}

export function applyCustomTweak (tweak: TweakType | undefined, calculatedValue: number) {
  if (!tweak) return calculatedValue
  return isFinite(tweak.override) ? tweak.override as number : calculatedValue + (tweak.bonus || 0)
}

/*
Possible Tweaks:
  "abilityScores.Strength.score",
  "abilityScores.Strength.savingThrowModifier",
  "abilityScores.Strength.skills.Athletics",
  "abilityScores.Dexterity.score",
  "abilityScores.Dexterity.savingThrowModifier",
  "abilityScores.Dexterity.skills.Acrobatics",
  "abilityScores.Dexterity.skills.Sleight of Hand",
  "abilityScores.Dexterity.skills.Stealth",
  "abilityScores.Constitution.score",
  "abilityScores.Constitution.savingThrowModifier",
  "abilityScores.Intelligence.score",
  "abilityScores.Intelligence.savingThrowModifier",
  "abilityScores.Intelligence.skills.Investigation",
  "abilityScores.Intelligence.skills.Lore",
  "abilityScores.Intelligence.skills.Nature",
  "abilityScores.Intelligence.skills.Piloting",
  "abilityScores.Intelligence.skills.Technology",
  "abilityScores.Wisdom.score",
  "abilityScores.Wisdom.savingThrowModifier",
  "abilityScores.Wisdom.skills.Animal Handling",
  "abilityScores.Wisdom.skills.Insight",
  "abilityScores.Wisdom.skills.Medicine",
  "abilityScores.Wisdom.skills.Perception",
  "abilityScores.Wisdom.skills.Survival",
  "abilityScores.Charisma.score",
  "abilityScores.Charisma.savingThrowModifier",
  "abilityScores.Charisma.skills.Deception",
  "abilityScores.Charisma.skills.Intimidation",
  "abilityScores.Charisma.skills.Performance",
  "abilityScores.Charisma.skills.Persuasion",
  "initiative",
  "proficiencyBonus",
  "armorClass",
  "hitPoints.maximum",
  "passivePerception",
  "speed.base",
  "weapon.toHit",
  "weapon.damage",
  "techCasting.maxPoints",
  "techCasting.attackModifier",
  "techCasting.saveDC",
  "techCasting.maxPowerLevel",
  "forceCasting.maxPoints",
  "forceCasting.attackModifier",
  "forceCasting.saveDC",
  "forceCasting.maxPowerLevel",
  "superiority.maxDice",
  "superiority.maneuverSaveDC"
*/

/*
  Custom Tweaks:
  Equipment
    toHit
    damage
    damageDice
*/
