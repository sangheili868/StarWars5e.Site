<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'

  @Component({
    components: {
      NavigationDrawer
    }
  })
  export default class HandbookNavigation extends Vue {
    items = [
      {
        title: 'Introduction',
        icon: 'fa-journal-whills',
        route: '/handbook'
      },
      {
        title: 'Step-By-Step Characters',
        icon: 'fa-male',
        route: '/handbook/stepByStep'
      },
      {
        title: 'Species',
        icon: 'fa-users',
        route: '/handbook/species'
      },
      {
        title: 'Classes',
        icon: 'fab fa-galactic-republic',
        route: '/handbook/classes'
      },
      {
        title: 'Backgrounds',
        icon: 'fa-briefcase',
        route: '/handbook/backgrounds'
      },
      {
        title: 'Equipment',
        icon: 'fa-tools',
        route: '/handbook/equipment'
      },
      {
        title: 'Customization Options',
        icon: 'fa-edit',
        route: '/handbook/customization'
      },
      {
        title: 'Using Ability Scores',
        icon: 'fa-dice-d20',
        route: '/handbook/abilityScores'
      },
      {
        title: 'Adventuring',
        icon: 'fa-rocket',
        route: '/handbook/adventuring'
      },
      {
        title: 'Combat',
        icon: 'fa-fist-raised',
        route: '/handbook/combat'
      },
      {
        title: 'Force- and Tech- Casting',
        icon: 'fa-bolt',
        route: '/handbook/casting'
      },
      {
        title: 'Conditions',
        icon: 'fa-biohazard',
        route: '/handbook/conditions'
      },
      {
        title: 'Recommended Variant Rules',
        icon: 'fa-cogs',
        route: '/handbook/variantRules'
      }
    ]
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/handbook")
</template>
