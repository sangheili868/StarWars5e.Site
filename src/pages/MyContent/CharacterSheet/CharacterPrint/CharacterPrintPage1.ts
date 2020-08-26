import { CompleteCharacterType, isCharacterArmorType } from '@/types/completeCharacterTypes'
import addPlus from '@/utilities/addPlus'
import { chain } from 'lodash'
import { printFieldType } from '@/types/utilityTypes'

export default function CharacterPrintPage1 (
  completeCharacter: CompleteCharacterType,
  myClasses: { [key: string]: string },
  playerName: string
): printFieldType[] {
  const skillsMap = chain(completeCharacter.abilityScores)
    .values()
    .map('skills')
    .flatten()
    .groupBy('name')
    .mapValues(0)
    .value()

  const armorList = completeCharacter.equipment
    .filter(isCharacterArmorType)
    .map(({ name }, index) => ({
      top: 242 + index * 17,
      left: 324,
      width: 169,
      myClass: myClasses.openSans + ' text-left',
      text: name
    }))
    .slice(0, 4)

  const hitDiceText = completeCharacter.hitPoints.hitDice.map(({ size, maximum }) => maximum + size).join(' ')

  const weaponList = completeCharacter.weapons.slice(0, 5).map((weapon, index) => {
      const { damageNumberOfDice, damageDieType, damageBonus, damageType } = weapon
      const hasDice = damageNumberOfDice && damageDieType
      const damageModifier = damageBonus ? addPlus(damageBonus) : ''
      const damage = hasDice ? damageNumberOfDice + 'd' + damageDieType + damageModifier : damageBonus
      const properties = (weapon.properties || []).join(', ')
      return [
        { top: 529 + index * 42, left: 312, width: 128, myClass: 'text-left', text: weapon.name },
        { top: 529 + index * 42, left: 442, width: 60, myClass: myClasses.openSans, text: addPlus(weapon.attackBonus || 0) },
        { top: 529 + index * 42, left: 504, width: 118, myClass: myClasses.openSans, text: damage + ' ' + damageType },
        { top: 548 + index * 42, left: 313, width: 424, myClass: myClasses.openSans + ' text-left', text: properties }
      ]
    }).flat()

  const combatFeaturesList = completeCharacter.combatFeatures.map(({ name }, index) => ({
    top: 830 + index * 17,
    left: 318,
    width: 360,
    myClass: 'text-left',
    text: name
  })).slice(0, 9)

  const hasMediumArmorMaster = completeCharacter.combatFeatures.some(({ name }) => name === 'Moderately Armored')

  function isProficient (proficiency: string) {
    if (proficiency === 'proficient') return myClasses.dot
    else if (proficiency === 'expertise') return myClasses.diamond
    else return ''
  }

  return [
    { top: 200, left: 470, myClass: hasMediumArmorMaster ? myClasses.dot : '' },
    // Top Box
    { top: 99, left: 77, width: 235, fontSize: 16, myClass: 'text-left', text: completeCharacter.name },
    { top: 52, left: 357, width: 240, myClass: 'text-left', text: completeCharacter.classText },
    { top: 52, left: 602, width: 127, myClass: 'text-left', text: completeCharacter.alignment },
    { top: 77, left: 357, width: 240, myClass: 'text-left', text: completeCharacter.species },
    { top: 77, left: 602, width: 127, myClass: 'text-left', text: completeCharacter.background },
    { top: 102, left: 357, width: 122, myClass: 'text-left', text: completeCharacter.experiencePoints.current },
    { top: 102, left: 484, width: 113, myClass: 'text-left', text: completeCharacter.experiencePoints.nextLevel },
    { top: 102, left: 602, width: 127, myClass: 'text-left', text: playerName },

    // Strength
    { top: 168, left: 81, width: 48, fontSize: 20, text: addPlus(completeCharacter.abilityScores.Strength.modifier) },
    { top: 200, left: 88, width: 34, fontSize: 16, text: completeCharacter.abilityScores.Strength.value },
    { top: 187, left: 146, myClass: isProficient(completeCharacter.abilityScores.Strength.savingThrow.proficiency) },
    { top: 179, left: 164, width: 23, text: addPlus(completeCharacter.abilityScores.Strength.savingThrow.modifier) },
    { top: 207, left: 138, myClass: isProficient(skillsMap.Athletics.proficiency) },
    { top: 200, left: 164, width: 23, text: addPlus(skillsMap.Athletics.modifier) },

    // Dexterity
    { top: 241, left: 81, width: 48, fontSize: 20, text: addPlus(completeCharacter.abilityScores.Dexterity.modifier) },
    { top: 273, left: 88, width: 34, fontSize: 16, text: completeCharacter.abilityScores.Dexterity.value },
    { top: 261, left: 146, myClass: isProficient(completeCharacter.abilityScores.Dexterity.savingThrow.proficiency) },
    { top: 253, left: 164, width: 23, text: addPlus(completeCharacter.abilityScores.Dexterity.savingThrow.modifier) },
    { top: 280, left: 138, myClass: isProficient(skillsMap.Acrobatics.proficiency) },
    { top: 272, left: 164, width: 23, text: addPlus(skillsMap.Acrobatics.modifier) },
    { top: 298, left: 138, myClass: isProficient(skillsMap['Sleight of Hand'].proficiency) },
    { top: 290, left: 164, width: 23, text: addPlus(skillsMap['Sleight of Hand'].modifier) },
    { top: 316, left: 138, myClass: isProficient(skillsMap.Stealth.proficiency) },
    { top: 307, left: 164, width: 23, text: addPlus(skillsMap.Stealth.modifier) },

    // Constitution
    { top: 336, left: 81, width: 48, fontSize: 20, text: addPlus(completeCharacter.abilityScores.Constitution.modifier) },
    { top: 368, left: 88, width: 34, fontSize: 16, text: completeCharacter.abilityScores.Constitution.value },
    { top: 357, left: 146, myClass: isProficient(completeCharacter.abilityScores.Constitution.savingThrow.proficiency) },
    { top: 348, left: 164, width: 23, text: addPlus(completeCharacter.abilityScores.Constitution.savingThrow.modifier) },

    // Intelligence
    { top: 410, left: 81, width: 48, fontSize: 20, text: addPlus(completeCharacter.abilityScores.Intelligence.modifier) },
    { top: 442, left: 88, width: 34, fontSize: 16, text: completeCharacter.abilityScores.Intelligence.value },
    { top: 430, left: 146, myClass: isProficient(completeCharacter.abilityScores.Intelligence.savingThrow.proficiency) },
    { top: 421, left: 164, width: 23, text: addPlus(completeCharacter.abilityScores.Intelligence.savingThrow.modifier) },
    { top: 450, left: 138, myClass: isProficient(skillsMap.Investigation.proficiency) },
    { top: 441, left: 164, width: 23, text: addPlus(skillsMap.Investigation.modifier) },
    { top: 467, left: 138, myClass: isProficient(skillsMap.Lore.proficiency) },
    { top: 459, left: 164, width: 23, text: addPlus(skillsMap.Lore.modifier) },
    { top: 484, left: 138, myClass: isProficient(skillsMap.Nature.proficiency) },
    { top: 476, left: 164, width: 23, text: addPlus(skillsMap.Nature.modifier) },
    { top: 502, left: 138, myClass: isProficient(skillsMap.Piloting.proficiency) },
    { top: 493, left: 164, width: 23, text: addPlus(skillsMap.Piloting.modifier) },
    { top: 519, left: 138, myClass: isProficient(skillsMap.Technology.proficiency) },
    { top: 511, left: 164, width: 23, text: addPlus(skillsMap.Technology.modifier) },

    // Wisdom
    { top: 541, left: 81, width: 48, fontSize: 20, text: addPlus(completeCharacter.abilityScores.Wisdom.modifier) },
    { top: 573, left: 88, width: 34, fontSize: 16, text: completeCharacter.abilityScores.Wisdom.value },
    { top: 561, left: 146, myClass: isProficient(completeCharacter.abilityScores.Wisdom.savingThrow.proficiency) },
    { top: 552, left: 164, width: 23, text: addPlus(completeCharacter.abilityScores.Wisdom.savingThrow.modifier) },
    { top: 580, left: 138, myClass: isProficient(skillsMap['Animal Handling'].proficiency) },
    { top: 571, left: 164, width: 23, text: addPlus(skillsMap['Animal Handling'].modifier) },
    { top: 598, left: 138, myClass: isProficient(skillsMap.Insight.proficiency) },
    { top: 589, left: 164, width: 23, text: addPlus(skillsMap.Insight.modifier) },
    { top: 615, left: 138, myClass: isProficient(skillsMap.Medicine.proficiency) },
    { top: 607, left: 164, width: 23, text: addPlus(skillsMap.Medicine.modifier) },
    { top: 632, left: 138, myClass: isProficient(skillsMap.Perception.proficiency) },
    { top: 624, left: 164, width: 23, text: addPlus(skillsMap.Perception.modifier) },
    { top: 650, left: 138, myClass: isProficient(skillsMap.Survival.proficiency) },
    { top: 641, left: 164, width: 23, text: addPlus(skillsMap.Survival.modifier) },

    // Charisma
    { top: 671, left: 81, width: 48, fontSize: 20, text: addPlus(completeCharacter.abilityScores.Charisma.modifier) },
    { top: 703, left: 88, width: 34, fontSize: 16, text: completeCharacter.abilityScores.Charisma.value },
    { top: 691, left: 146, myClass: isProficient(completeCharacter.abilityScores.Charisma.savingThrow.proficiency) },
    { top: 682, left: 164, width: 23, text: addPlus(completeCharacter.abilityScores.Charisma.savingThrow.modifier) },
    { top: 710, left: 138, myClass: isProficient(skillsMap.Deception.proficiency) },
    { top: 702, left: 164, width: 23, text: addPlus(skillsMap.Deception.modifier) },
    { top: 728, left: 138, myClass: isProficient(skillsMap.Intimidation.proficiency) },
    { top: 719, left: 164, width: 23, text: addPlus(skillsMap.Intimidation.modifier) },
    { top: 746, left: 138, myClass: isProficient(skillsMap.Performance.proficiency) },
    { top: 737, left: 164, width: 23, text: addPlus(skillsMap.Performance.modifier) },
    { top: 763, left: 138, myClass: isProficient(skillsMap.Persuasion.proficiency) },
    { top: 755, left: 164, width: 23, text: addPlus(skillsMap.Persuasion.modifier) },

    // Senses & Movement
    { top: 818, left: 79, width: 42, fontSize: 16, text: completeCharacter.passivePerception },
    // { top: 908, left: 86, width: 42, text: completeCharacter.vision },
    { top: 958, left: 86, width: 42, text: completeCharacter.speed.base },
    { top: 960, left: 151, width: 46, fontSize: 10, text: completeCharacter.speed.hour },
    { top: 960, left: 218, width: 46, fontSize: 10, text: completeCharacter.speed.day },

    // Combat
    { top: 155, left: 302, width: 42, fontSize: 20, text: addPlus(completeCharacter.proficiencyBonus) },
    { top: 154, left: 535, width: 37, fontSize: 20, text: addPlus(completeCharacter.initiative) },
    { top: 203, left: 306, width: 41, fontSize: 20, text: completeCharacter.armorClass },
    ...armorList,
    { top: 210, left: 665, width: 64, fontSize: 20, text: completeCharacter.hitPoints.maximum },
    { top: 381, left: 657, width: 64, text: hitDiceText },
    ...weaponList,
    ...combatFeaturesList
  ]
}
