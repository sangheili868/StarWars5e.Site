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
        route: '/rules/starships'
      },
      {
        title: 'Step-By-Step Starships',
        icon: 'fa-pencil-ruler',
        route: '/rules/starships/stepByStep'
      },
      {
        title: 'Deployments',
        icon: 'fa-user-friends',
        route: '/rules/starships/deployments',
        items: [
          {
            title: 'Coordinator',
            icon: 'fa-headset',
            route: '/rules/starships/deployments/Coordinator'
          },
          {
            title: 'Gunner',
            icon: 'fa-fighter-jet',
            route: '/rules/starships/deployments/Gunner'
          },
          {
            title: 'Mechanic',
            icon: 'fa-wrench',
            route: '/rules/starships/deployments/Mechanic'
          },
          {
            title: 'Operator',
            icon: 'fa-eye',
            route: '/rules/starships/deployments/Operator'
          },
          {
            title: 'Pilot',
            icon: 'fa-helicopter',
            route: '/rules/starships/deployments/Pilot'
          }
        ]
      },
      {
        title: 'Starships',
        icon: 'fa-rocket',
        route: '/rules/starships/starshipSizes',
        items: [
          {
            title: 'Tiny',
            route: '/rules/starships/starshipSizes/Tiny'
          },
          {
            title: 'Small',
            route: '/rules/starships/starshipSizes/Small'
          },
          {
            title: 'Medium',
            route: '/rules/starships/starshipSizes/Medium'
          },
          {
            title: 'Large',
            route: '/rules/starships/starshipSizes/Large'
          },
          {
            title: 'Huge',
            route: '/rules/starships/starshipSizes/Huge'
          },
          {
            title: 'Gargantuan',
            route: '/rules/starships/starshipSizes/Gargantuan'
          }
        ]
      },
      {
        title: 'Modifications',
        icon: 'fa-hammer',
        route: '/rules/starships/modifications'
      },
      {
        title: 'Equipment',
        icon: 'fa-tools',
        route: '/rules/starships/equipment'
      },
      {
        title: 'Customization Options',
        icon: 'fa-edit',
        route: '/rules/starships/customization'
      },
      {
        title: 'Using Ability Scores',
        icon: 'fa-dice-d20',
        route: '/rules/starships/abilityScores'
      },
      {
        title: 'Adventuring',
        icon: 'fa-plane',
        route: '/rules/starships/adventuring'
      },
      {
        title: 'Combat',
        icon: 'fa-meteor',
        route: '/rules/starships/combat'
      },
      {
        title: 'Generating Encounters',
        icon: 'fa-dna',
        route: '/rules/starships/generatingEncounters'
      },
      {
        title: 'Conditions',
        icon: 'fa-biohazard',
        route: '/rules/starships/conditions'
      },
      {
        title: 'Changelog',
        icon: 'fa-list',
        route: '/rules/starships/changelog'
      }
    ]
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/rules/starships")
</template>
