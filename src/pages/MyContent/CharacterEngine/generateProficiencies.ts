import { RawCharacterType } from '@/types/rawCharacterTypes'
import { ClassType } from '@/types/characterTypes'

export default function generateProficiencies (rawCharacter: RawCharacterType, classes: ClassType[]) {
  return [
    'Light Armor',
    'Simple Vibroweapons',
    'Techblades',
    'Simple Blasters',
    'Mason\'s Tools',
    'Medium Armor',
    'All Blasters',
    'All kinetic weapons',
    'Biochemist\'s Kit',
    'Lightsaber',
    'Carpenter\'s Kit',
    'Heavy Armor'
  ]
}
