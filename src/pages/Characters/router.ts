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
import CharactersFightingStyles from './CharactersFightingStyles.vue'
import CharactersFightingMasteries from './CharactersFightingMasteries.vue'
import CharactersLightsaberForms from './CharactersLightsaberForms.vue'

export default {
  path: '/characters',
  component: PageNester,
  children: [
    {
      path: '/characters',
      component: CharactersPage,
      meta: {
        title: 'Character Resources'
      }
    },
    {
      path: '/characters/species',
      component: CharactersSpecies,
      meta: {
        title: 'Species'
      }
    },
    {
      path: '/characters/species/:speciesName',
      component: CharactersSpeciesDetail,
      props: true,
      meta: {
        title: 'Species'
      }
    },
    {
      path: '/characters/classes',
      component: CharactersClasses,
      meta: {
        title: 'Classes'
      }
    },
    {
      path: '/characters/classes/:className',
      component: CharactersClassDetail,
      props: true,
      meta: {
        title: 'Classes'
      }
    },
    {
      path: '/characters/archetypes',
      component: CharactersArchetypes,
      meta: {
        title: 'Archetypes'
      }
    },
    {
      path: '/characters/archetypes/:archetypeName',
      component: CharactersArchetypeDetail,
      props: true,
      meta: {
        title: 'Archetype'
      }
    },
    {
      path: '/characters/backgrounds',
      component: CharactersBackgrounds,
      meta: {
        title: 'Backgrounds'
      }
    },
    {
      path: '/characters/backgrounds/:backgroundName',
      component: CharactersBackgroundDetail,
      props: true,
      meta: {
        title: 'Backgrounds'
      }
    },
    {
      path: '/characters/feats',
      component: CharactersFeats,
      meta: {
        title: 'Feats'
      }
    },
    {
      path: '/characters/fightingStyles',
      component: CharactersFightingStyles,
      meta: {
        title: 'Fighting Styles'
      }
    },
    {
      path: '/characters/fightingMasteries',
      component: CharactersFightingMasteries,
      meta: {
        title: 'Fighting Masteries'
      }
    },
    {
      path: '/characters/forcePowers',
      component: CharactersForcePowers,
      meta: {
        title: 'Force Powers'
      }
    },
    {
      path: '/characters/techPowers',
      component: CharactersTechPowers,
      meta: {
        title: 'Tech Powers'
      }
    },
    {
      path: '/characters/lightsaberForms',
      component: CharactersLightsaberForms,
      meta: {
        title: 'Lightsaber Forms'
      }
    }
  ]
}
