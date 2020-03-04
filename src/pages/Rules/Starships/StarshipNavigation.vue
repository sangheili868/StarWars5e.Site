<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'

  @Component({
    components: {
      NavigationDrawer
    }
  })
  export default class StarshipNavigation extends Vue {
    items = [
      {
        title: 'Introduction',
        icon: 'fa-journal-whills',
        route: '/rules/sotg'
      },
      {
        title: 'Step-By-Step Starships',
        icon: 'fa-pencil-ruler',
        route: '/rules/sotg/stepByStep'
      },
      {
        title: 'Deployments',
        icon: 'fa-user-friends',
        route: '/rules/sotg/deployments',
        items: [
          {
            title: 'Coordinator',
            icon: 'fa-headset',
            route: '/rules/sotg/deployments/Coordinator'
          },
          {
            title: 'Gunner',
            icon: 'fa-fighter-jet',
            route: '/rules/sotg/deployments/Gunner'
          },
          {
            title: 'Mechanic',
            icon: 'fa-wrench',
            route: '/rules/sotg/deployments/Mechanic'
          },
          {
            title: 'Operator',
            icon: 'fa-eye',
            route: '/rules/sotg/deployments/Operator'
          },
          {
            title: 'Pilot',
            icon: 'fa-helicopter',
            route: '/rules/sotg/deployments/Pilot'
          }
        ]
      },
      {
        title: 'Starships',
        icon: 'fa-rocket',
        route: '/rules/sotg/starshipSizes',
        items: [
          {
            title: 'Tiny',
            route: '/rules/sotg/starshipSizes/Tiny'
          },
          {
            title: 'Small',
            route: '/rules/sotg/starshipSizes/Small'
          },
          {
            title: 'Medium',
            route: '/rules/sotg/starshipSizes/Medium'
          },
          {
            title: 'Large',
            route: '/rules/sotg/starshipSizes/Large'
          },
          {
            title: 'Huge',
            route: '/rules/sotg/starshipSizes/Huge'
          },
          {
            title: 'Gargantuan',
            route: '/rules/sotg/starshipSizes/Gargantuan'
          }
        ]
      },
      {
        title: 'Modifications',
        icon: 'fa-hammer',
        route: '/rules/sotg/modifications'
      },
      {
        title: 'Equipment',
        icon: 'fa-tools',
        route: '/rules/sotg/equipment'
      },
      {
        title: 'Customization Options',
        icon: 'fa-edit',
        route: '/rules/sotg/customization'
      },
      {
        title: 'Using Ability Scores',
        icon: 'fa-dice-d20',
        route: '/rules/sotg/abilityScores'
      },
      {
        title: 'Adventuring',
        icon: 'fa-plane',
        route: '/rules/sotg/adventuring'
      },
      {
        title: 'Combat',
        icon: 'fa-meteor',
        route: '/rules/sotg/combat'
      },
      {
        title: 'Generating Encounters',
        icon: 'fa-dna',
        route: '/rules/sotg/generatingEncounters'
      },
      {
        title: 'Conditions',
        icon: 'fa-biohazard',
        route: '/rules/sotg/conditions'
      },
      {
        title: 'Changelog',
        icon: 'fa-list',
        route: '/rules/sotg/changelog'
      }
    ]
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/rules/sotg")
</template>
