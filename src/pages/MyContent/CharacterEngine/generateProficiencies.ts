import { RawCharacterType } from '@/types/rawCharacterTypes'

export default function generateProficiencies (rawCharacter: RawCharacterType) {
  // Requires class details from databse
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
