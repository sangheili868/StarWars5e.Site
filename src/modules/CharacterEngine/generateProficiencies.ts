import { RawCharacterType } from '@/types/rawCharacterTypes'
import { ClassType } from '@/types/characterTypes'
import { CompletedFeatureType } from '@/types/completeCharacterTypes'
import { compact, uniqBy, lowerCase } from 'lodash'

export default function generateProficiencies (
  rawCharacter: RawCharacterType,
  classes: ClassType[],
  feats: CompletedFeatureType[]
) {
  const startingClass = rawCharacter.classes[0]
  const startingClassData = startingClass && classes.find(({ name }) => name === startingClass.name)
  const fromStartingClass = startingClassData && [
    startingClassData.weaponProficiencies,
    startingClassData.armorProficiencies
  ].flat()
  const fromOtherClasses = rawCharacter.classes.slice(1)
    .map(({ name }) => {
      const myClass = classes.find(({ name: className }) => className === name)
      return myClass ? myClass.multiClassProficiencies : []
    })
    .flat()
  const fromFeats = [] as string[] // Until feats have proficiencies

  const fromSpecies = compact([
    rawCharacter.species.toolProficiency,
    rawCharacter.species.weaponProficiency
  ])

  return uniqBy([
    ...(fromStartingClass || []),
    ...fromOtherClasses,
    ...compact(rawCharacter.classes.map(({ toolProficiency }) => toolProficiency)),
    ...fromSpecies,
    ...(rawCharacter.background.toolProficiencies || []),
    ...fromFeats
  ], lowerCase)
}
