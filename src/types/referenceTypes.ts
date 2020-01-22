export interface MonsterType {
  alignment: string,
  armorClass: number,
  armorType: string,
  behaviors: {
    name: string,
    monsterBehaviorType: string,
    description: string,
    attackType: string,
    restrictions: string,
    attackBonus: number,
    range: string,
    numberOfTargets: string,
    damage: string,
    damageType: string
  }[],
  challengeRating: string,
  charisma: number,
  charismaModifier: number,
  conditionsImmunitiesOther: string[],
  conditionsImmunitiesParsed: number[],
  constitution: number,
  constitutionModifier: number,
  contentSource: string,
  contentType: string,
  damageImmunitiesOther: string[],
  damageImmunitiesParsed: number[],
  damageResistancesOther: string[],
  damageResistancesParsed: number[],
  damageVulnerabilitiesOther: string[],
  damageVulnerabilitiesParsed: number[],
  dexterity: number,
  dexterityModifier: number,
  experiencePoints: number,
  hitPointRoll: string,
  hitPoints: number,
  intelligence: number,
  intelligenceModifier: number,
  languages: string[],
  name: string,
  savingThrows: string[],
  senses: string[],
  size: string,
  skills: string[],
  speed: number,
  speeds: string,
  strength: number,
  strengthModifier: number,
  types: string[],
  wisdom: number,
  wisdomModifier: number
}

export interface VariantRuleBlobType {
  chapterName: string,
  contentMarkdown: string
}

export interface SkillsType {
  [ ability: string ]: string[]
}

export interface gdFeats {
  name: string,
  description: string,
  proficiencies: string[]
}
