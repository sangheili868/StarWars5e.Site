<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
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
        icon: 'fa-sun',
        route: '/handbook/casting'
      },
      {
        title: 'Force Powers',
        icon: 'fab fa-jedi-order',
        route: '/handbook/forcePowers'
      },
      {
        title: 'Tech Powers',
        icon: 'fa-bolt',
        route: '/handbook/techPowers'
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
  v-navigation-drawer(permanent, fixed, app, clipped)
    v-list.dense
      v-list-tile(v-for="item in items", :key="item.title", :to="item.route" :exact="item.route === '/handbook'")

        v-list-tile-action
          v-icon(:class="$style.icon") {{ item.icon }}

        v-list-tile-content
          v-list-tile-title {{ item.title }}
</template>

<style module lang="scss">
  .icon {
    text-align: center;
    width: 30px;
  }
</style>
