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
        title: '1. Step-By-Step Starships',
        icon: 'fa-pencil-ruler',
        route: '/rules/sotg/stepByStep'
      },
      {
        title: '2. Deployments',
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
          },
          {
            title: 'Technician',
            icon: 'fa-shield-alt',
            route: '/rules/sotg/deployments/Technician'
          }
        ]
      },
      {
        title: '3. Starships',
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
        title: '4. Modifications',
        icon: 'fa-hammer',
        route: '/rules/sotg/modifications'
      },
      {
        title: '5. Equipment',
        icon: 'fa-tools',
        route: '/rules/sotg/equipment'
      },
      {
        title: '6. Customization Options',
        icon: 'fa-edit',
        route: '/rules/sotg/customization'
      },
      {
        title: '7. Using Ability Scores',
        icon: 'fa-dice-d20',
        route: '/rules/sotg/abilityScores'
      },
      {
        title: '8. Adventuring',
        icon: 'fa-plane',
        route: '/rules/sotg/adventuring'
      },
      {
        title: '9. Combat',
        icon: 'fa-meteor',
        route: '/rules/sotg/combat'
      },
      {
        title: '10. Generating Encounters',
        icon: 'fa-dna',
        route: '/rules/sotg/generatingEncounters'
      },
      {
        title: 'A. Conditions',
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
