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
        route: '/starships'
      },
      {
        title: 'Step-By-Step Starships',
        icon: 'fa-pencil-ruler',
        route: '/starships/stepByStep'
      },
      {
        title: 'Deployments',
        icon: 'fa-user-friends',
        route: '/starships/deployments',
        items: [
          {
            title: 'Coordinator',
            icon: 'fa-headset',
            route: 'starships/deployments/Coordinator'
          },
          {
            title: 'Gunner',
            icon: 'fa-fighter-jet',
            route: 'starships/deployments/Gunner'
          },
          {
            title: 'Mechanic',
            icon: 'fa-wrench',
            route: 'starships/deployments/Mechanic'
          },
          {
            title: 'Operator',
            icon: 'fa-eye',
            route: 'starships/deployments/Operator'
          },
          {
            title: 'Pilot',
            icon: 'fa-helicopter',
            route: 'starships/deployments/Pilot'
          }
        ]
      },
      {
        title: 'Starships',
        icon: 'fa-rocket',
        route: '/starships/starships'
      },
      {
        title: 'Modifications',
        icon: 'fa-hammer',
        route: '/starships/modifications'
      },
      {
        title: 'Equipment',
        icon: 'fa-tools',
        route: '/starships/equipment'
      },
      {
        title: 'Customization Options',
        icon: 'fa-edit',
        route: '/starships/customization'
      },
      {
        title: 'Using Ability Scores',
        icon: 'fa-dice-d20',
        route: '/starships/abilityScores'
      },
      {
        title: 'Adventuring',
        icon: 'fa-plane',
        route: '/starships/adventuring'
      },
      {
        title: 'Combat',
        icon: 'fa-meteor',
        route: '/starships/combat'
      },
      {
        title: 'Conditions',
        icon: 'fa-biohazard',
        route: '/starships/conditions'
      }
    ]
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/starships")
</template>
