
import HandbookPage from './HandbookPage.vue'
import HandbookNavigation from './HandbookNavigation.vue'
import HandbookSpecies from './HandbookSpecies.vue'
import HandbookIntroduction from './HandbookIntroduction.vue'

export default {
  path: '/handbook',
  components: {
    default: HandbookPage,
    navigation: HandbookNavigation
  },
  children: [
    {
      path: '',
      component: HandbookIntroduction
    },
    {
      path: 'stepByStep'
    },
    {
      path: 'species',
      component: HandbookSpecies
    },
    {
      path: 'classes'
    },
    {
      path: 'backgrounds'
    },
    {
      path: 'equipment'
    },
    {
      path: 'customization'
    },
    {
      path: 'abilityScores'
    },
    {
      path: 'adventuring'
    },
    {
      path: 'combat'
    },
    {
      path: 'casting'
    },
    {
      path: 'forcePowers'
    },
    {
      path: 'techPowers'
    },
    {
      path: 'conditions'
    },
    {
      path: 'variantRules'
    }
  ]
}
