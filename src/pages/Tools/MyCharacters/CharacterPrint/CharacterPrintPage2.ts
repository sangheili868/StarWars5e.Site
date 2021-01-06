import { CompleteCharacterType, CompletedFeatureType, CustomFeaturesType } from '@/types/completeCharacterTypes'
import { startCase } from 'lodash'
import { printFieldType } from '@/types/utilityTypes'

export default function CharacterPrintPage2 (
  completeCharacter: CompleteCharacterType,
  myClasses: { [key: string]: string }
): printFieldType[] {
  return [
    // Left Column
    {
      top: 34,
      left: 70,
      width: 210,
      height: 160,
      myClass: myClasses.multiline,
      text: [
        ...completeCharacter.proficiencies.map(({ name }) => startCase(name)),
        ...completeCharacter.customProficiencies.map(({ name, proficiencyLevel }, index) =>
          startCase(name) + (proficiencyLevel === 'expertise' ? ' (Expertise)' : '')
        )
      ].join(', ')
    },
    {
      top: 223,
      left: 70,
      width: 210,
      height: 71,
      myClass: myClasses.multiline,
      text: [
        ...completeCharacter.languages,
        ...completeCharacter.customLanguages
      ].join(', ')
    },
    {
      top: 321,
      left: 70,
      width: 210,
      height: 676,
      myClass: myClasses.multiline,
      text: [
        ...completeCharacter.combatFeatures.map(({ name, text }: CompletedFeatureType) => name + ': ' + text),
        ...completeCharacter.nonCombatFeatures.map(({ name, text }: CompletedFeatureType) => name + ': ' + text),
        ...completeCharacter.customFeatures.map(({ name, content }: CustomFeaturesType) => name + ': ' + content)
      ].join('\n')
    },

    // Right Column
    { top: 52, left: 303, width: 447, height: 50, myClass: myClasses.multiline, text: completeCharacter.characteristics['Place of Birth'] },
    { top: 106, left: 341, width: 174, myClass: myClasses.openSans, text: completeCharacter.characteristics.Age },
    { top: 124, left: 341, width: 174, myClass: myClasses.openSans, text: completeCharacter.characteristics.Height },
    { top: 142, left: 341, width: 174, myClass: myClasses.openSans, text: '' },
    { top: 160, left: 341, width: 174, myClass: myClasses.openSans, text: completeCharacter.characteristics.Eyes },
    { top: 106, left: 563, width: 187, myClass: myClasses.openSans, text: completeCharacter.characteristics.Gender },
    { top: 124, left: 563, width: 187, myClass: myClasses.openSans, text: completeCharacter.characteristics.Weight },
    { top: 142, left: 563, width: 187, myClass: myClasses.openSans, text: completeCharacter.characteristics.Hair },
    { top: 160, left: 563, width: 187, myClass: myClasses.openSans, text: completeCharacter.characteristics.Skin },
    { top: 195, left: 303, width: 447, height: 35, myClass: myClasses.openSans, text: completeCharacter.characteristics.Appearance },
    { top: 249, left: 303, width: 447, height: 35, myClass: myClasses.multiline, text: completeCharacter.characteristics['Personality Traits'] },
    { top: 302, left: 303, width: 447, height: 35, myClass: myClasses.multiline, text: completeCharacter.characteristics.Ideal },
    { top: 355, left: 303, width: 447, height: 35, myClass: myClasses.multiline, text: completeCharacter.characteristics.Bond },
    { top: 408, left: 303, width: 447, height: 35, myClass: myClasses.multiline, text: completeCharacter.characteristics.Flaw },
    { top: 445, left: 404, width: 346, myClass: 'text-left', text: completeCharacter.backgroundFeature.name },
    { top: 462, left: 303, width: 447, height: 216, myClass: myClasses.multiline, text: completeCharacter.backgroundFeature.text },
    { top: 712, left: 303, width: 447, height: 291, myClass: myClasses.multiline, text: completeCharacter.characteristics.Backstory }
  ]
}
