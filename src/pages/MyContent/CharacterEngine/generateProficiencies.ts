import { RawCharacterType } from '@/types/rawCharacterTypes'
import { ClassType } from '@/types/characterTypes'
import { compact, uniqBy, lowerCase } from 'lodash'

const multiclassProficiencies: { [myClass: string]: string[] } = {
  Berserker: [ 'Light armor', 'all vibroweapons' ],
  Consular: [ 'Simple lightweapons' ],
  Fighter: [ 'Light armor', 'medium armor', 'all blasters', 'all vibroweapons' ],
  Engineer: [ 'Light armor' ],
  Guardian: [ 'Light armor', 'medium armor', 'all lightweapons', 'all vibroweapons' ],
  Operative: [ 'Light armor' ],
  Monk: [ 'Simple vibroweapons', 'techblades' ],
  Scout: [ 'Light armor', 'medium armor', 'all blasters', 'all vibroweapons' ],
  Scholar: [ 'light armor' ],
  Sentinel: [ 'light armor', 'simple lightweapons', 'simple vibroweapons' ]
}

const featProficiencies: { [feat: string]: string } = {
  'Heavily Armored': 'Heavy armor'
}

export default function generateProficiencies (rawCharacter: RawCharacterType, classes: ClassType[], feats: string[]) {
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
  const fromFeats = compact(feats.map(featName => featProficiencies[featName]))

  return uniqBy([
    ...(fromStartingClass || []),
    ...fromOtherClasses,
    ...compact(rawCharacter.classes.map(({ toolProficiency }) => toolProficiency)),
    rawCharacter.species.toolProficiency,
    rawCharacter.species.weaponProficiency,
    ...(rawCharacter.background.toolProficiencies || []),
    ...fromFeats
  ], lowerCase)
}
