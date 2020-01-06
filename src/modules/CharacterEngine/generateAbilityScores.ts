import { RawCharacterType, RawFeatType, RawASIType } from '@/types/rawCharacterTypes'
import { ClassType, SpeciesType } from '@/types/characterTypes'
import { chain, mapValues, get } from 'lodash'
import { SkillsType } from '@/types/referenceTypes'
import applyTweak from '@/utilities/applyTweak'

function isASI (asi: RawFeatType | RawASIType): asi is RawASIType {
  return asi && asi.type === 'Ability Score Improvement'
}

function getAbilityScore (rawCharacter: RawCharacterType, ability: string, mySpecies: SpeciesType | undefined) {
  const backgroundImprovements = rawCharacter.background.feat && rawCharacter.background.feat.abilityScoreImprovements
  const fixedSpeciesImprovement = mySpecies && mySpecies.abilitiesIncreased[0]
    .find(({ abilities }) => abilities.includes(ability) && abilities.length === 1)
  const classImprovements = rawCharacter.classes
    .reduce((acc, { abilityScoreImprovements }) => acc + abilityScoreImprovements
      .reduce((acc2, abilityScoreImprovement) => acc2 + (isASI(abilityScoreImprovement) ? abilityScoreImprovement.abilitiesIncreased
        .reduce((acc3, { name, value }) => acc3 + (name === ability ? value : 0), 0) : 0),
      0),
    0)
  const calculatedScore = rawCharacter.baseAbilityScores[ability] + classImprovements +
    (rawCharacter.species.abilityScoreImprovement[ability] || 0) +
    (fixedSpeciesImprovement ? fixedSpeciesImprovement.amount : 0) +
    ((backgroundImprovements && backgroundImprovements[ability]) || 0)
  return applyTweak(rawCharacter, `abilityScores.${ability}.score`, calculatedScore)
}

function getProficientSkills (rawCharacter: RawCharacterType, skillsList: SkillsType):{ [ability: string]: { [skill: string]: string } } {
  return mapValues(skillsList, (skills, ability) => chain(skills)
    .keyBy()
    .mapValues(skill => {
      const tweak = get(rawCharacter, `tweaks.abilityScores.${ability}.skills.${skill}.proficiency`)
      const isExpertise = rawCharacter.classes.some(myClass => Array.isArray(myClass.expertise) && myClass.expertise.includes(skill)) ||
        tweak === 'Expertise'
      const isProficient = rawCharacter.classes.some(myClass => myClass.skills && myClass.skills.includes(skill)) ||
        (rawCharacter.background.skills && rawCharacter.background.skills.includes(skill)) ||
        rawCharacter.species.skillProficiency === skill ||
        tweak === 'Proficient'
      return (isExpertise && 'expertise') || (isProficient && 'proficient') || 'none'
    }).value())
}

function getProficientSaves (rawCharacter: RawCharacterType, myClasses: ClassType[]) {
  const startingClass = rawCharacter.classes[0]
  if (!startingClass) console.error('Warning: No starting class')
  const startingClassData = startingClass && myClasses.find(({ name }) => name === startingClass.name)
  const customSaves = rawCharacter.customProficiencies
    .filter(({ name }) => name.includes('Saving Throws'))
    .map(({ name }) => name.split(' ')[0])
  return [ ...(startingClassData ? startingClassData.savingThrows : []), ...customSaves ]
}

function getModifier (value: number) {
  return Math.floor(value / 2) - 5
}

export default function generateAbilityScores (
  rawCharacter: RawCharacterType,
  myClasses: ClassType[],
  mySpecies: SpeciesType | undefined,
  proficiencyBonus: number,
  skillsList: SkillsType
) {
  const proficiencyBonuses: { [proficiencyLevel: string]: number } = {
    expertise: 2 * proficiencyBonus,
    proficient: proficiencyBonus,
    none: 0
  }
  const proficientSkills = getProficientSkills(rawCharacter, skillsList)
  const proficientSkillsList = Object.values(proficientSkills)
    .map(skillList => Object.keys(skillList).filter(skill => ['expertise', 'proficient'].includes(skillList[skill])))
    .flat()
  const proficientSaves = getProficientSaves(rawCharacter, myClasses)

  return {
    abilityScores: mapValues(skillsList, (skills, ability) => {
      const value = getAbilityScore(rawCharacter, ability, mySpecies)
      const modifier = getModifier(value)
      const isProficientInSave = proficientSaves.includes(ability)
      const savingThrowModifier = modifier + (isProficientInSave ? proficiencyBonus : 0)

      return {
        value,
        modifier,
        savingThrow: {
          modifier: applyTweak(rawCharacter, `abilityScores.${ability}.savingThrowModifier`, savingThrowModifier),
          proficiency: isProficientInSave ? 'proficient' : 'none'
        },
        skills: skills.map(name => {
          const proficiency = proficientSkills[ability][name] || 'none'
          const skillModifer = modifier + proficiencyBonuses[proficiency]
          return {
            name,
            modifier: applyTweak(rawCharacter, `abilityScores.${ability}.skills.${name}`, skillModifer),
            proficiency
          }
        })
      }
    }),
    skillAndSaveProficiencies: [ ...proficientSkillsList, ...proficientSaves.map(save => save + ' Saving Throws') ]
  }
}
