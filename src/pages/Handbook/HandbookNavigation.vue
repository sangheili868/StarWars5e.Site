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
        route: '/handbook/classes',
        items: [
          {
            title: 'Berserker',
            icon: '',
            route: '/handbook/classes/Berserker'
          },
          {
            title: 'Consular',
            icon: '',
            route: '/handbook/classes/Consular'
          },
          {
            title: 'Engineer',
            icon: '',
            route: '/handbook/classes/Engineer'
          },
          {
            title: 'Fighter',
            icon: '',
            route: '/handbook/classes/Fighter'
          },
          {
            title: 'Guardian',
            icon: '',
            route: '/handbook/classes/Guardian'
          },
          {
            title: 'Monk',
            icon: '',
            route: '/handbook/classes/Monk'
          },
          {
            title: 'Operative',
            icon: '',
            route: '/handbook/classes/Operative'
          },
          {
            title: 'Scholar',
            icon: '',
            route: '/handbook/classes/Scholar'
          },
          {
            title: 'Scout',
            icon: '',
            route: '/handbook/classes/Scout'
          },
          {
            title: 'Sentinel',
            icon: '',
            route: '/handbook/classes/Sentinel'
          }
        ]
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
