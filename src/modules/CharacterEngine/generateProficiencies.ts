import { RawCharacterType } from '@/types/rawCharacterTypes'
import { ClassType } from '@/types/characterTypes'
import { compact, uniqBy, lowerCase, chain } from 'lodash'
import { MulticlassProficienciesType, gdFeats } from '@/types/referenceTypes'

export default function generateProficiencies (
  rawCharacter: RawCharacterType,
  classes: ClassType[],
  feats: string[],
  multiclassProficiencies: MulticlassProficienciesType,
  gdFeats: gdFeats[]
) {
  const startingClass = rawCharacter.classes.find(({ isStartingClass }) => isStartingClass)
  const startingClassData = startingClass && classes.find(({ name }) => name === startingClass.name)
  const fromStartingClass = startingClassData && [
    startingClassData.weaponProficiencies,
    startingClassData.armorProficiencies
  ].flat()
  const fromOtherClasses = rawCharacter.classes
    .filter(({ isStartingClass }) => !isStartingClass)
    .map(({ name }) => multiclassProficiencies[name])
    .flat()
  const fromFeats = chain(feats)
    .map(featName => {
      const featData = gdFeats.find(({ name }) => featName === name)
      return featData && featData.proficiencies
    })
    .compact()
    .flatten()
    .value()

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
