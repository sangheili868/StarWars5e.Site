import { RawCharacterType, ProficiencyType } from '@/types/rawCharacterTypes'
import { ClassType } from '@/types/characterTypes'
import { CompletedFeatureType, CharacterProficiency } from '@/types/completeCharacterTypes'
import { compact, uniqBy, lowerCase, toUpper } from 'lodash'

export default function generateProficiencies (
  rawCharacter: RawCharacterType,
  classes: ClassType[],
  feats: CompletedFeatureType[]
): CharacterProficiency[] {
  const startingClass = rawCharacter.classes[0]
  const startingClassData = startingClass && classes.find(({ name }) => name === startingClass.name)
  const fromStartingClass = startingClassData && [
    startingClassData.weaponProficiencies.map(name => ({
      name,
      type: 'weapon' as ProficiencyType
    })),
    startingClassData.armorProficiencies.map(name => ({
      name,
      type: 'armor'
    }))
  ].flat()
  const fromOtherClasses = rawCharacter.classes.slice(1)
    .map(({ name }) => {
      const myClass = classes.find(({ name: className }) => className === name)
      return myClass ? myClass.multiClassProficiencies.map(name => ({
        name,
        type: 'other'
      })) : []
    })
    .flat()

  return uniqBy([
    ...(fromStartingClass || []),
    ...fromOtherClasses,
  ], proficiency => lowerCase(proficiency.name))
}
