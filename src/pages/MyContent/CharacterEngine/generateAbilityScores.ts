import { RawCharacterType } from '@/types/rawCharacterTypes'
import { ClassType } from '@/types/characterTypes'
import { chain, mapValues } from 'lodash'

const skillObj: { [ability: string]: string[] } = {
  Strength: ['Athletics'],
  Dexterity: ['Acrobatics', 'Sleight of Hand', 'Stealth'],
  Constitution: [],
  Intelligence: ['Investigation', 'Lore', 'Nature', 'Piloting', 'Technology'],
  Wisdom: ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'],
  Charisma: ['Deception', 'Intimidation', 'Performance', 'Persuasion']
}

function getAbilityScore (rawCharacter: RawCharacterType, ability: string) {
  const backgroundImprovements = rawCharacter.background.feat.abilityScoreImprovements
  return rawCharacter.baseAbilityScores[ability] +
    (rawCharacter.species.abilityScoreImprovement[ability] || 0) +
    ((backgroundImprovements && backgroundImprovements[ability]) || 0)
    // Todo: Add class ability score improvements (and from feats)
}

function getProficientSkills (rawCharacter: RawCharacterType):{ [ability: string]: { [skill: string]: string } } {
  return mapValues(skillObj, skills => chain(skills)
    .keyBy()
    .mapValues(skill => {
      const isExpertise = rawCharacter.classes.some(myClass => Array.isArray(myClass.expertise) && myClass.expertise.includes(skill))
      const isProficient = rawCharacter.classes.some(myClass => myClass.skills && myClass.skills.includes(skill)) ||
        rawCharacter.background.skills.includes(skill) ||
        rawCharacter.species.skillProficiency === 'skill'
      return (isExpertise && 'expertise') || (isProficient && 'proficient') || 'none'
    }).value())
}

function getProficientSaves (rawCharacter: RawCharacterType, myClasses: ClassType[]) {
  const startingClass = rawCharacter.classes.find(myClass => myClass.isStartingClass)
  if (!startingClass) console.error('Warning: No starting class')
  const startingClassData = startingClass && myClasses.find(({ name }) => name === startingClass.name)
  return startingClassData && startingClassData.savingThrows
}

function getModifier (value: number) {
  return Math.floor(value / 2) - 5
}

export default function generateAbilityScores (
  rawCharacter: RawCharacterType,
  myClasses: ClassType[],
  proficiencyBonus: number
) {
  const proficiencyBonuses: { [proficiencyLevel: string]: number } = {
    expertise: 2 * proficiencyBonus,
    proficient: proficiencyBonus,
    none: 0
  }
  const proficientSkills = getProficientSkills(rawCharacter)
  const proficientSaves = getProficientSaves(rawCharacter, myClasses)
  const intBonus = getModifier(getAbilityScore(rawCharacter, 'Intelligence'))
  const scholarData = rawCharacter.classes.find(({ name }) => name === 'Scholar')
  const skillWithIntBonus = scholarData && scholarData.archetype.silverTongue && scholarData.archetype.silverTongue.intSkillBonus

  return mapValues(skillObj, (skills, ability) => {
    const value = getAbilityScore(rawCharacter, ability)
    const modifier = getModifier(value)
    const isProficientInSave = proficientSaves && proficientSaves.includes(ability)

    return {
      value,
      modifier,
      savingThrow: {
        modifier: modifier + (isProficientInSave ? proficiencyBonus : 0),
        proficiency: isProficientInSave ? 'proficient' : 'none'
      },
      skills: skills.map(name => {
        const proficiency = proficientSkills[ability][name] || 'none'
        const silverTongueBonus = skillWithIntBonus === name ? intBonus : 0
        return {
          name,
          modifier: modifier + proficiencyBonuses[proficiency] + silverTongueBonus,
          proficiency
        }
      })
    }
  })
}
