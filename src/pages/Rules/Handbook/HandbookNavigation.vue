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
          route: '/rules/phb'
        },
        {
          title: 'What\'s Different?',
          icon: 'fa-exclamation-circle',
          route: '/rules/phb/whatsDifferent'
        },
        {
          title: 'Step-By-Step Characters',
          icon: 'fa-male',
          route: '/rules/phb/stepByStep'
        },
        {
          title: 'Species',
          icon: 'fa-users',
          route: '/rules/phb/species',
          items: this.species.filter(({ contentType }) => contentType === 'Core').map(({ name }) => ({
            title: name,
            icon: '',
            route: '/rules/phb/species/' + name
          }))
        },
        {
          title: 'Classes',
          icon: 'fab fa-galactic-republic',
          route: '/rules/phb/classes',
          items: [
            {
              title: 'Berserker',
              icon: '',
              route: '/rules/phb/classes/Berserker'
            },
            {
              title: 'Consular',
              icon: '',
              route: '/rules/phb/classes/Consular'
            },
            {
              title: 'Engineer',
              icon: '',
              route: '/rules/phb/classes/Engineer'
            },
            {
              title: 'Fighter',
              icon: '',
              route: '/rules/phb/classes/Fighter'
            },
            {
              title: 'Guardian',
              icon: '',
              route: '/rules/phb/classes/Guardian'
            },
            {
              title: 'Monk',
              icon: '',
              route: '/rules/phb/classes/Monk'
            },
            {
              title: 'Operative',
              icon: '',
              route: '/rules/phb/classes/Operative'
            },
            {
              title: 'Scholar',
              icon: '',
              route: '/rules/phb/classes/Scholar'
            },
            {
              title: 'Scout',
              icon: '',
              route: '/rules/phb/classes/Scout'
            },
            {
              title: 'Sentinel',
              icon: '',
              route: '/rules/phb/classes/Sentinel'
            }
          ]
        },
        {
          title: 'Backgrounds',
          icon: 'fa-briefcase',
          route: '/rules/phb/backgrounds'
        },
        {
          title: 'Equipment',
          icon: 'fa-tools',
          route: '/rules/phb/equipment'
        },
        {
          title: 'Customization Options',
          icon: 'fa-edit',
          route: '/rules/phb/customization'
        },
        {
          title: 'Using Ability Scores',
          icon: 'fa-dice-d20',
          route: '/rules/phb/abilityScores'
        },
        {
          title: 'Adventuring',
          icon: 'fa-rocket',
          route: '/rules/phb/adventuring'
        },
        {
          title: 'Combat',
          icon: 'fa-fist-raised',
          route: '/rules/phb/combat'
        },
        {
          title: 'Casting',
          icon: 'fa-bolt',
          route: '/rules/phb/casting',
          items: [
            {
              title: 'Force Powers',
              icon: 'fas fa-jedi',
              route: '/rules/phb/casting/forcePowers'
            },
            {
              title: 'Tech Powers',
              icon: 'fa-microchip',
              route: '/rules/phb/casting/techPowers'
            }
          ]
        },
        {
          title: 'Conditions',
          icon: 'fa-biohazard',
          route: '/rules/phb/conditions'
        },
        {
          title: 'Variant Rules',
          icon: 'fa-cogs',
          route: '/rules/phb/variantRules'
        },
        {
          title: 'Changelog',
          icon: 'fa-list',
          route: '/rules/phb/changelog'
        }
      ]
    }
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/rules/phb")
</template>
