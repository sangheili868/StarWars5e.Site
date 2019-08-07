import PageNester from '@/components/PageNester.vue'
import CharactersPage from './CharactersPage.vue'
import CharactersClasses from './CharactersClasses.vue'
import CharactersClassDetail from './CharactersClassDetail.vue'
import CharactersSpecies from './CharactersSpecies.vue'
import CharactersSpeciesDetail from '@/pages/Characters/CharactersSpeciesDetail.vue'
import CharactersForcePowers from '@/pages/Characters/CharactersForcePowers.vue'
import CharactersTechPowers from '@/pages/Characters/CharactersTechPowers.vue'
import CharactersArchetypes from './CharactersArchetypes.vue'
import CharactersArchetypeDetail from './CharactersArchetypeDetail.vue'
import CharactersBackgrounds from './CharactersBackgrounds.vue'
import CharactersBackgroundDetail from './CharactersBackgroundDetail.vue'
import CharactersFeats from './CharactersFeats.vue'
import CharactersVariantRules from './CharactersVariantRules.vue'
import CharactersVariantRulesDetail from './CharactersVariantRulesDetail.vue'

export default {
  path: '/characters',
  component: PageNester,
  children: [
    {
      path: '/characters',
      component: CharactersPage
    },
    {
      path: '/characters/species',
      component: CharactersSpecies
    },
    {
      path: '/characters/species/:speciesName',
      component: CharactersSpeciesDetail,
      props: true
    },
    {
      path: '/characters/classes',
      component: CharactersClasses
    },
    {
      path: '/characters/classes/:className',
      component: CharactersClassDetail,
      props: true
    },
    {
      path: '/characters/archetypes',
      component: CharactersArchetypes
    },
    {
      path: '/characters/archetypes/:archetypeName',
      component: CharactersArchetypeDetail,
      props: true
    },
    {
      path: '/characters/backgrounds',
      component: CharactersBackgrounds
    },
    {
      path: '/characters/backgrounds/:backgroundName',
      component: CharactersBackgroundDetail,
      props: true
    },
    {
      path: '/characters/feats',
      component: CharactersFeats
    },
    {
      path: '/characters/forcePowers',
      component: CharactersForcePowers
    },
    {
      path: '/characters/techPowers',
      component: CharactersTechPowers
    },
    {
      path: '/characters/additionalVariantRules',
      component: CharactersVariantRules
    },
    {
      path: '/characters/additionalVariantRules/:variantRuleName',
      component: CharactersVariantRulesDetail,
      props: true
    }
  ]
}
