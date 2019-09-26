<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'
  import _ from 'lodash'
  import { SpeciesType } from '@/types/characterTypes'
  import { VariantRuleBlobType } from '@/types/referenceTypes'

  const blobsModule = namespace('blobs')
  const speciesModule = namespace('species')

  @Component({
    components: {
      NavigationDrawer
    }
  })
  export default class HandbookNavigation extends Vue {
    @blobsModule.State variantRuleBlobs!: VariantRuleBlobType[]
    @blobsModule.Action fetchVariantRuleBlobs!: () => void
    @speciesModule.State species!: SpeciesType[]
    @speciesModule.Action fetchSpecies!: () => void

    created () {
      this.fetchVariantRuleBlobs()
      this.fetchSpecies()
    }

    get items () {
      return [
        {
          title: 'Introduction',
          icon: 'fa-journal-whills',
          route: '/rules/handbook'
        },
        {
          title: 'What\'s Different?',
          icon: 'fa-exclamation-circle',
          route: '/rules/handbook/whatsDifferent'
        },
        {
          title: 'Step-By-Step Characters',
          icon: 'fa-male',
          route: '/rules/handbook/stepByStep'
        },
        {
          title: 'Species',
          icon: 'fa-users',
          route: '/rules/handbook/species',
          items: this.species.filter(({ contentType }) => contentType === 'Core').map(({ name }) => ({
            title: name,
            icon: '',
            route: '/rules/handbook/species/' + name
          }))
        },
        {
          title: 'Classes',
          icon: 'fab fa-galactic-republic',
          route: '/rules/handbook/classes',
          items: [
            {
              title: 'Berserker',
              icon: '',
              route: '/rules/handbook/classes/Berserker'
            },
            {
              title: 'Consular',
              icon: '',
              route: '/rules/handbook/classes/Consular'
            },
            {
              title: 'Engineer',
              icon: '',
              route: '/rules/handbook/classes/Engineer'
            },
            {
              title: 'Fighter',
              icon: '',
              route: '/rules/handbook/classes/Fighter'
            },
            {
              title: 'Guardian',
              icon: '',
              route: '/rules/handbook/classes/Guardian'
            },
            {
              title: 'Monk',
              icon: '',
              route: '/rules/handbook/classes/Monk'
            },
            {
              title: 'Operative',
              icon: '',
              route: '/rules/handbook/classes/Operative'
            },
            {
              title: 'Scholar',
              icon: '',
              route: '/rules/handbook/classes/Scholar'
            },
            {
              title: 'Scout',
              icon: '',
              route: '/rules/handbook/classes/Scout'
            },
            {
              title: 'Sentinel',
              icon: '',
              route: '/rules/handbook/classes/Sentinel'
            }
          ]
        },
        {
          title: 'Backgrounds',
          icon: 'fa-briefcase',
          route: '/rules/handbook/backgrounds'
        },
        {
          title: 'Equipment',
          icon: 'fa-tools',
          route: '/rules/handbook/equipment'
        },
        {
          title: 'Customization Options',
          icon: 'fa-edit',
          route: '/rules/handbook/customization'
        },
        {
          title: 'Using Ability Scores',
          icon: 'fa-dice-d20',
          route: '/rules/handbook/abilityScores'
        },
        {
          title: 'Adventuring',
          icon: 'fa-rocket',
          route: '/rules/handbook/adventuring'
        },
        {
          title: 'Combat',
          icon: 'fa-fist-raised',
          route: '/rules/handbook/combat'
        },
        {
          title: 'Casting',
          icon: 'fa-bolt',
          route: '/rules/handbook/casting',
          items: [
            {
              title: 'Force Powers',
              icon: 'fas fa-jedi',
              route: '/rules/handbook/casting/forcePowers'
            },
            {
              title: 'Tech Powers',
              icon: 'fa-microchip',
              route: '/rules/handbook/casting/techPowers'
            }
          ]
        },
        {
          title: 'Conditions',
          icon: 'fa-biohazard',
          route: '/rules/handbook/conditions'
        },
        {
          title: 'Variant Rules',
          icon: 'fa-cogs',
          route: '/rules/handbook/variantRules'
        },
        {
          title: 'Changelog',
          icon: 'fa-list',
          route: '/rules/handbook/changelog'
        }
      ]
    }
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/rules/handbook")
</template>
