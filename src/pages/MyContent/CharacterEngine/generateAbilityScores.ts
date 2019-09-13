import { RawCharacterType } from '@/types/rawCharacterTypes'

export default function generateAbilityScores (rawCharacter: RawCharacterType) {
  return {
    'strength': {
      'value': 16,
      'modifier': 3,
      'savingThrow': {
        'modifier': 3,
        'proficiency': 'none'
      },
      'skills': [
        {
          'name': 'Athletics',
          'modifier': 9,
          'proficiency': 'expertise'
        }
      ]
    },
    'dexterity': {
      'value': 12,
      'modifier': 1,
      'savingThrow': {
        'modifier': 4,
        'proficiency': 'proficient'
      },
      'skills': [
        {
          'name': 'Acrobatics',
          'modifier': 1,
          'proficiency': 'none'
        },
        {
          'name': 'Sleight Of Hand',
          'modifier': 1,
          'proficiency': 'none'
        },
        {
          'name': 'Stealth',
          'modifier': 1,
          'proficiency': 'none'
        }
      ]
    },
    'constitution': {
      'value': 12,
      'modifier': 1,
      'savingThrow': {
        'modifier': 1,
        'proficiency': 'none'
      }
    },
    'intelligence': {
      'value': 18,
      'modifier': 4,
      'savingThrow': {
        'modifier': 7,
        'proficiency': 'proficient'
      },
      'skills': [
        {
          'name': 'Investigation',
          'modifier': 7,
          'proficiency': 'proficient'
        },
        {
          'name': 'Lore',
          'modifier': 4,
          'proficiency': 'none'
        },
        {
          'name': 'Nature',
          'modifier': 4,
          'proficiency': 'none'
        },
        {
          'name': 'Piloting',
          'modifier': 7,
          'proficiency': 'proficient'
        },
        {
          'name': 'Technology',
          'modifier': 4,
          'proficiency': 'none'
        }
      ]
    },
    'wisdom': {
      'value': 8,
      'modifier': -1,
      'savingThrow': {
        'modifier': -1,
        'proficiency': 'none'
      },
      'skills': [
        {
          'name': 'Animal Handling',
          'modifier': 2,
          'proficiency': 'proficient'
        },
        {
          'name': 'Insight',
          'modifier': -1,
          'proficiency': 'none'
        },
        {
          'name': 'Medicine',
          'modifier': 2,
          'proficiency': 'proficient'
        },
        {
          'name': 'Perception',
          'modifier': -1,
          'proficiency': 'none'
        },
        {
          'name': 'Survival',
          'modifier': 2,
          'proficiency': 'proficient'
        }
      ]
    },
    'charisma': {
      'value': 10,
      'modifier': 0,
      'savingThrow': {
        'modifier': 0,
        'proficiency': 'none'
      },
      'skills': [
        {
          'name': 'Deception',
          'modifier': 0,
          'proficiency': 'none'
        },
        {
          'name': 'Intimidation',
          'modifier': 0,
          'proficiency': 'none'
        },
        {
          'name': 'Performance',
          'modifier': 0,
          'proficiency': 'none'
        },
        {
          'name': 'Persuasion',
          'modifier': 10,
          'proficiency': 'expertise'
        }
      ]
    }
  }
}
