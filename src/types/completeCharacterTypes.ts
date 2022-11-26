import { BackgroundType, FeatureType, ManeuverType, PowerType } from '@/types/characterTypes'
import { EquipmentType, EnhancedItemType, GearType, ArmorType, WeaponType } from '@/types/lootTypes'
import { TweaksType, CustomProficiencyType, HighLevelCastingType, SettingsType, CustomEquipmentType, ProficiencyType, EquipmentTweakType, FeatureConfigType } from './rawCharacterTypes'
import { ConditionType } from './lookupTypes'

export interface AbilityScoreType {
  value: number,
  modifier: number,
  savingThrow: {
    modifier: number,
    proficiency: string
  },
  skills: {
    name: string,
    modifier: number,
    proficiency: string
  }[]
}

export interface HitPointsType {
  maximum: number,
  current: number,
  temporary: number,
  hitDice: {
    size: string,
    current: number,
    maximum: number
  }[],
  deathSaves: {
    successes: number,
    failures: number
  },
  resting: {
    hitDieBonus: number,
    numHitDiceUsed: number,
    hitDiceRestored: {
      size: string,
      numRestored: number
    }[],
    shortRestFeatures: string[],
    longRestFeatures: string[],
    highLevelCasting: HighLevelCastingType,
    techPointsUsed: number,
    forcePointsUsed: number
  }
}

export interface CastingType {
  pointsUsed: number,
  maxPoints: number,
  maxPowerLevel: number,
  powersKnown: PowerType[]
}

export interface TechCastingType extends CastingType {
  attackModifier: number,
  saveDC: number
}

export interface ForceCastingType extends CastingType {
  lightAttackModifier: number,
  lightSaveDC: number,
  darkAttackModifier: number,
  darkSaveDC: number,
  universalAttackModifier: number,
  universalSaveDC: number
}

export interface CharacteristicsType {
  'Personality Traits': string,
  Ideal: string,
  Bond: string,
  Flaw: string,
  Gender: string,
  'Place of Birth': string,
  Age: string,
  Height: string,
  Weight: string,
  Hair: string,
  Eyes: string,
  Skin: string,
  Appearance: string,
  Backstory: string
}

export interface SuperiorityType {
  currentDice: number,
  maxDice: number,
  diceSize: string,
  physicalModifier: number,
  physicalSaveDC: number,
  mentalModifier: number,
  mentalSaveDC: number,
  generalModifier: number,
  generalSaveDC: number,
  maneuvers: ManeuverType[]
}

export interface CompletedFeatureType {
  config?: FeatureConfigType,
  level?: number,
  name: string,
  text: string,
  combat: boolean,
  metadata?: {
    fightingStyles?: {
      number: number
    }
  }
  source?: string,
  sourceName?: string,
  customIndex?: number,
  rowKey: string,
  usage?: {
    recharge: string,
    used: number,
    maximum: number
  }
}

export interface AbilityScoresType {
  [ability: string]: AbilityScoreType
}

export interface CustomFeaturesType {
  name: string,
  content: string
}

export interface CustomWeaponType extends CustomEquipmentType {
  attackBonus: number,
  damageBonus: number,
  ability: string,
  damageDieType: number,
  index: number,
  properties: string[],
  isCustom: true
}

interface CharacterBaseLootType {
  quantity: number,
  index: number,
  isFound: true
}

export interface CharacterLootMissingType {
  name: string,
  quantity: number,
  index: number,
  isFound: false
}

export interface CharacterGearType extends GearType, CharacterBaseLootType {}

export interface CharacterArmorType extends ArmorType, CharacterBaseLootType {
  equipped: boolean
}

export interface CharacterWeaponType extends WeaponType, CharacterBaseLootType {
  equipped: boolean,
  attackBonus: number,
  damageBonus: number,
  ability: string,
  isCustom: false,
  tweaks: EquipmentTweakType
}

export interface CharacterEnhancedItemType extends EnhancedItemType, CharacterBaseLootType {
  equipped: boolean,
  attuned: boolean
}

export type CharacterEquipmentType = CharacterGearType | CharacterArmorType | CharacterWeaponType
export type CharacterValidLootType = CharacterEquipmentType | CharacterEnhancedItemType
export type CharacterLootType = CharacterValidLootType | CharacterLootMissingType
export interface AttunementType {
  current: number,
  maximum: number,
  hasAttunable: boolean
}

export interface CharacterProficiency {
  name: string,
  type: ProficiencyType
}

export interface CompleteCharacterType {
  name: string,
  builderVersion: string,
  image: string | null,
  currentLevel: number,
  classText: string,
  alignment: string,
  species: string,
  background: string,
  experiencePoints: {
    previousLevel: number,
    current: number,
    nextLevel: number,
    isCorrect: boolean,
    errorMessage: string
  },
  abilityScores: AbilityScoresType,
  proficiencyBonus: number,
  initiative: number,
  armorClass: number,
  armorList: string[]
  hitPoints: HitPointsType,
  conditions: ConditionType[],
  exhaustion: number,
  passivePerception: number,
  inspiration: boolean,
  vision: string,
  speed: {
    base: string,
    hour: string,
    day: string,
    special: string
  },
  proficiencies: CharacterProficiency[],
  skillAndSaveProficiencies: string[],
  languages: string[],
  characteristics: CharacteristicsType,
  equipment: CharacterLootType[],
  attunement: AttunementType,
  weapons: (CharacterWeaponType | CustomWeaponType)[],
  credits: number,
  carryingCapacity: {
    encumbered: number,
    heavilyEncumbered: number,
    maxCapacity: number,
    pushDragLift: number
  },
  superiority: false | SuperiorityType,
  techCasting: false | TechCastingType,
  highLevelCasting: HighLevelCastingType,
  forceCasting: false | ForceCastingType,
  allForcePowers: string[],
  combatFeatures: CompletedFeatureType[],
  nonCombatFeatures: CompletedFeatureType[],
  backgroundFeature: CompletedFeatureType | undefined,
  tweaks: TweaksType,
  customLanguages: string[],
  customProficiencies: CustomProficiencyType[],
  customFeatures: CustomFeaturesType[],
  customTechPowers: string[],
  customForcePowers: string[],
  customEquipment: CustomEquipmentType[],
  numCustomFeats: number,
  settings: SettingsType,
  notes: string
}

// Typeguards

export function isCharacterValidLootType (loot: CharacterLootType): loot is CharacterValidLootType {
  return loot.isFound
}

export function isCharacterEnhancedItem (loot: CharacterLootType): loot is CharacterEnhancedItemType {
  return isCharacterValidLootType(loot) && !((loot as EquipmentType).equipmentCategory)
}

export function isEquippable (loot: CharacterLootType): loot is CharacterArmorType | CharacterWeaponType {
  return isCharacterValidLootType(loot) && !isCharacterEnhancedItem(loot) && ['Weapon', 'Armor'].includes(loot.equipmentCategory)
}

export function isCharacterWeaponType (loot: CharacterLootType): loot is CharacterWeaponType {
  return isCharacterValidLootType(loot) && !isCharacterEnhancedItem(loot) && loot.equipmentCategory === 'Weapon'
}

export function isCharacterArmorType (loot: CharacterLootType): loot is CharacterArmorType {
  return isCharacterValidLootType(loot) && !isCharacterEnhancedItem(loot) && loot.equipmentCategory === 'Armor'
}

export function isCharacterGearType (loot: CharacterLootType): loot is CharacterGearType {
  return isCharacterValidLootType(loot) && !isCharacterEnhancedItem(loot) && !['Weapon', 'Armor'].includes(loot.equipmentCategory)
}
