import { RawCharacterType } from '@/types/rawCharacterTypes'
import { pick } from 'lodash'
import generateExperience from './generateExperience'
import generateAbilityScores from './generateAbilityScores'
import generateCombatStats from './generateCombatStats'
import generateHitPoints from './generateHitPoints'
import generateProficiencies from './generateProficiencies'
import generateLanguages from './generateLanguages'
import generateEquipment from './generateEquipment'
import generateCarryingCapacity from './generateCarryingCapacity'
import generateSuperiorty from './generateSuperiority'
import generateCasting from './generateCasting'
import generateCombatFeatures from './generateCombatFeatures'
import generateNonCombatFeatures from './generateNonCombatFeatures'

export default function generateCharacter (rawCharacter: RawCharacterType) {
  const credits = rawCharacter.equipment.find(({ name }) => name === 'credits')
  const completeCharacter = {
    ...pick(rawCharacter, [
      'name',
      'image',
      'user',
      'characteristics'
    ]),
    classes: rawCharacter.classes.map(({ name, levels, archetype }) => ({ name, levels, archetype: archetype.name })),
    alignment: rawCharacter.characteristics.alignment,
    species: rawCharacter.species.name,
    background: rawCharacter.background.name,
    experiencePoints: generateExperience(rawCharacter),
    abilityScores: generateAbilityScores(rawCharacter),
    ...generateCombatStats(rawCharacter),
    hitPoints: generateHitPoints(rawCharacter),
    proficiencies: generateProficiencies(rawCharacter),
    languages: generateLanguages(rawCharacter),
    equipment: generateEquipment(rawCharacter),
    credits: credits && credits.quantity,
    carryingCapacity: generateCarryingCapacity(rawCharacter),
    superiority: generateSuperiorty(rawCharacter),
    ...generateCasting(rawCharacter),
    combatFeatures: generateCombatFeatures(rawCharacter),
    nonCombatFeatures: generateNonCombatFeatures(rawCharacter)
  }
  console.log(completeCharacter)
  // return completeCharacter
  return completeCharacter
}
