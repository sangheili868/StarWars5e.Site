import { RawCharacterType, ProficiencyType } from '@/types/rawCharacterTypes'
import { ClassType, BackgroundType } from '@/types/characterTypes'
import { CharacterProficiency } from '@/types/completeCharacterTypes'
import { uniqBy, lowerCase } from 'lodash'

export default function generateProficiencies (
  rawCharacter: RawCharacterType,
  classes: ClassType[],
  background: BackgroundType | undefined
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
      type: 'armor' as ProficiencyType
    }))
  ].flat()
  const fromOtherClasses = rawCharacter.classes.slice(1)
    .map(({ name }) => {
      const myClass = classes.find(({ name: className }) => className === name)
      return myClass ? myClass.multiClassProficiencies.map(name => ({
        name,
        type: 'other' as ProficiencyType
      })) : []
    })
    .flat()
  const fromBackground = background && background.toolProficiencies ? [{
    name: background.toolProficiencies,
    type: 'tool' as ProficiencyType
  }] : []

  return uniqBy([
    ...(fromStartingClass || []),
    ...fromOtherClasses,
    ...fromBackground
  ], proficiency => lowerCase(proficiency.name))
}
