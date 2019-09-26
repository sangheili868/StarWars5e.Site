import PageNester from '@/components/PageNester.vue'
import HandbookNavigation from './HandbookNavigation.vue'
import HandbookChapter from './HandbookChapter.vue'
import HandbookSpecies from './HandbookSpecies.vue'
import CharactersSpeciesDetail from '@/pages/Characters/CharactersSpeciesDetail.vue'
import CharactersForcePowers from '@/pages/Characters/CharactersForcePowers.vue'
import CharactersTechPowers from '@/pages/Characters/CharactersTechPowers.vue'
import HandbookClasses from './HandbookClasses.vue'
import HandbookClassesDetail from './HandbookClassesDetail.vue'
import HandbookCasting from './HandbookCasting.vue'
import HandbookBackgrounds from './HandbookBackgrounds.vue'
import HandbookCustomizationOptions from './HandbookCustomizationOptions.vue'

export default {
  path: 'handbook',
  components: {
    default: PageNester,
    navigation: HandbookNavigation
  },
  children: [
    {
      path: 'species',
      component: HandbookSpecies
    },
    {
      path: 'species/:speciesName',
      component: CharactersSpeciesDetail,
      props: true
    },
    {
      path: 'classes',
      component: HandbookClasses,
      meta: {
        title: 'Classes | Handbook'
      }
    },
    {
      path: 'casting',
      component: HandbookCasting
    },
    {
      path: 'casting/forcePowers',
      component: CharactersForcePowers,
      meta: {
        title: 'Force Powers | Handbook'
      }
    },
    {
      path: 'casting/techPowers',
      component: CharactersTechPowers,
      meta: {
        title: 'Tech Powers | Handbook'
      }
    },
    {
      path: 'backgrounds',
      component: HandbookBackgrounds
    },
    {
      path: 'customization',
      component: HandbookCustomizationOptions
    },
    {
      path: 'classes/:className',
      component: HandbookClassesDetail,
      props: true
    },
    {
      path: ':chapter',
      component: HandbookChapter,
      props: true
    },
    {
      path: '',
      component: HandbookChapter,
      props: {
        chapter: 'introduction'
      }
    }
  ]
}
