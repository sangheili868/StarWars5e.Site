import { RawCharacterType } from '@/types/rawCharacterTypes'
import { pick, compact } from 'lodash'
import { ClassType, PowerType } from '@/types/characterTypes'
import { EquipmentType } from '@/types/lootTypes'
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

export default function generateCharacter (
  rawCharacter: RawCharacterType,
  classes: ClassType[],
  equipment: EquipmentType[],
  powers: PowerType[]
) {
  const credits = rawCharacter.equipment.find(({ name }) => name === 'credits')
  const myClasses = rawCharacter.classes.map(({ name }) => classes.find(myClass => name === myClass.name))
  if (myClasses.includes(undefined)) console.error('Class not found from ' + rawCharacter.classes.map(({ name }) => name))
  const myFoundClasses = compact(myClasses)
  const abilityScores = generateAbilityScores(rawCharacter, myFoundClasses)
  const myEquipment = generateEquipment(rawCharacter, equipment)

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
    abilityScores,
    ...generateCombatStats(rawCharacter, abilityScores, myEquipment),
    hitPoints: generateHitPoints(rawCharacter, abilityScores, myFoundClasses),
    proficiencies: generateProficiencies(rawCharacter, myFoundClasses),
    languages: generateLanguages(rawCharacter),
    equipment: myEquipment,
    credits: credits && credits.quantity,
    carryingCapacity: generateCarryingCapacity(rawCharacter, abilityScores),
    superiority: generateSuperiorty(rawCharacter, abilityScores, myFoundClasses),
    ...generateCasting(rawCharacter, abilityScores, powers),
    combatFeatures: generateCombatFeatures(rawCharacter, myFoundClasses),
    nonCombatFeatures: generateNonCombatFeatures(rawCharacter, myFoundClasses)
  }
  console.log(completeCharacter)
  // return completeCharacter
  return completeCharacter
}
