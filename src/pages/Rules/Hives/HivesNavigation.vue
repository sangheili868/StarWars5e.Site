<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'

  @Component({
    components: {
      NavigationDrawer
    }
  })
  export default class HivesNavigation extends Vue {
    items = [
      {
        title: 'Introduction',
        icon: 'fa-journal-whills',
        route: '/rules/wh'
      },
      {
        title: 'Step-By-Step Factions',
        icon: 'fa-beer',
        route: '/rules/wh/stepByStepFactions'
      },
      {
        title: 'Entertainment and Downtime',
        icon: 'fa-pencil-ruler',
        route: '/rules/wh/downtime'
      },
      {
        title: 'Factions and Membership',
        icon: 'fa-globe',
        route: '/rules/wh/factionsAndMembership'
      },
      {
        title: 'Using Ability Scores',
        icon: 'fa-dice-d20',
        route: '/rules/wh/abilityScores'
      },
      {
        title: 'Equipment',
        icon: 'fa-shopping-bag',
        route: '/rules/wh/equipment'
      },
      {
        title: 'Customization Options',
        icon: 'fa-tools',
        route: '/rules/wh/customizationOptions'
      },
      {
        title: 'Enhanced Items',
        icon: 'fa-hat-wizard',
        route: '/rules/wh/enhancedItems'
      },
      {
        title: 'Tool Proficiencies',
        icon: 'fa-mortar-pestle',
        route: '/rules/wh/toolProficiencies'
      },
      {
        title: 'Changelog',
        icon: 'fa-list',
        route: '/rules/wh/changelog'
      }
    ]
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/rules/wh")
</template>
