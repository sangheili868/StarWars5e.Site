import { RawCharacterType, RawClassType } from '@/types/rawCharacterTypes'
import { ClassType } from '@/types/characterTypes'
import { chain, mapValues } from 'lodash'

export default function generateAbilityScores(rawCharacter: RawCharacterType, myClasses: ClassType[]) {
  const classSavProfs: { [myClass: string]: string[] } = {
    Berserker: ['strength', 'constitution'],
    Consular: ['wisdom', 'charisma'],
    Engineer: ['constitution', 'intelligence'],
    Fighter: ['strength', 'constitution'],
    Guardian: ['constitution', 'charisma'],
    Monk: ['strength', 'dexterity'],
    Operative: ['dexterity', 'intelligence'],
    Scholar: ['dexterity', 'intelligence'],
    Scout: ['strength', 'dexterity'],
    Sentinel: ['dexterity', 'charisma']
  }
  const skillObj: { [ability: string]: string[] } = {
    strength: ['Athletics'],
    dexterity: ['Acrobatics', 'Sleight of Hand', 'Stealth'],
    constitution: [],
    intelligence: ['Investigation', 'Lore', 'Nature', 'Piloting', 'Technology'],
    wisdom: ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'],
    charisma: ['Deception', 'Intimidation', 'Performance', 'Persuasion']
  }

  function getAbilityScore (ability: string) {
    const backgroundImprovements = rawCharacter.background.feat.abilityScoreImprovements
    return rawCharacter.baseAbilityScores[ability] +
      (rawCharacter.species.abilityScoreImprovement[ability] || 0) +
      (backgroundImprovements && backgroundImprovements[ability] || 0)
      // Todo: Add class ability score improvements (and from feat)
  }

  const currentLevel = rawCharacter.classes.reduce((acc, { levels }) => acc + levels, 0)
  const proficiencyBonus = 1 + Math.ceil(currentLevel / 4)
  const proficiencyBonuses: { [proficiencyLevel: string]: number } = {
    expertise: 2 * proficiencyBonus,
    proficient: proficiencyBonus,
    none: 0
  }

  const proficientSkills:{ [ability: string]: { [skill: string]: string } } = mapValues(skillObj, skills => chain(skills)
  .keyBy()
  .mapValues(skill => {
    const isExpertise = rawCharacter.classes.find(myClass => myClass.expertise && myClass.expertise.includes(skill))
    const isProficient = rawCharacter.classes.find(myClass => myClass.skills && myClass.skills.includes(skill)) ||
      rawCharacter.background.skills.includes(skill) ||
      rawCharacter.species.skillProficiency === 'skill'
    return (isExpertise && 'expertise') || (isProficient && 'proficient') || 'none'
  }).value())

  const startingClass = rawCharacter.classes.find(myClass => myClass.isStartingClass)
  if (!startingClass) console.error('Warning: No starting class')

  return mapValues(skillObj, (skills, ability) => {
    const value = getAbilityScore(ability)
    const modifier = Math.floor(value / 2) - 5
    const isProficientInSave = startingClass && classSavProfs[startingClass.name].includes(ability)

    return {
      value,
      modifier,
      savingThrow: {
        modifier: modifier + (isProficientInSave ? proficiencyBonus : 0),
        proficiency: isProficientInSave ? 'proficient' : 'none'
      },
      skills: skills.map(name => {
        const proficiency = proficientSkills[ability][name] || 'none'
        return {
          name,
          modifier: modifier + proficiencyBonuses[proficiency],
          proficiency
        }
      })
    }
  })
}
