export interface CharacterAdvancementType {
  level: number,
  experiencePoints: number,
  proficiencyBonus: number
}

export interface ConditionType {
  name: string,
  description: string
}

export interface SkillType {
  name: string,
  baseAttribute: string
}
