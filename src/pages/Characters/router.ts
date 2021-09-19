import PageNester from '@/components/PageNester.vue'
import CharactersPage from './CharactersPage.vue'
import CharactersClasses from './CharactersClasses.vue'
import CharactersClassDetail from './CharactersClassDetail.vue'
import CharactersClassImprovements from './CharactersClassImprovements.vue'
import CharactersMulticlassImprovements from './CharactersMulticlassImprovements.vue'
import CharactersSplashclassImprovements from './CharactersSplashclassImprovements.vue'
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
import CharactersCustomizationOptions from './CharactersCustomizationOptions.vue'
import CharactersWeaponFocuses from './CharactersWeaponFocuses.vue'
import CharactersWeaponSupremacies from './CharactersWeaponSupremacies.vue'

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
      path: '/characters/customizationOptions',
      component: CharactersCustomizationOptions,
      meta: {
        title: 'Customization Options'
      }
    },
    {
      path: '/characters/customizationOptions/classImprovements',
      component: CharactersClassImprovements,
      meta: {
        title: 'Class Improvements'
      }
    },
    {
      path: '/characters/customizationOptions/fightingStyles',
      component: CharactersFightingStyles,
      meta: {
        title: 'Fighting Styles'
      }
    },
    {
      path: '/characters/customizationOptions/fightingMasteries',
      component: CharactersFightingMasteries,
      meta: {
        title: 'Fighting Masteries'
      }
    },
    {
      path: '/characters/customizationOptions/multiclassImprovements',
      component: CharactersMulticlassImprovements,
      meta: {
        title: 'Multiclass Improvements'
      }
    },
    {
      path: '/characters/customizationOptions/splashclassImprovements',
      component: CharactersSplashclassImprovements,
      meta: {
        title: 'Splashclass Improvements'
      }
    },
    {
      path: '/characters/customizationOptions/weaponFocuses',
      component: CharactersWeaponFocuses,
      meta: {
        title: 'Weapon Focuses'
      }
    },
    {
      path: '/characters/customizationOptions/weaponSupremacies',
      component: CharactersWeaponSupremacies,
      meta: {
        title: 'Weapon Supremacies'
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
      path: '/characters/customizationOptions/lightsaberForms',
      component: CharactersLightsaberForms,
      meta: {
        title: 'Lightsaber Forms'
      }
    }
  ]
}
