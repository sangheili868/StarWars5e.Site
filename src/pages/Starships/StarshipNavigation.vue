<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
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
        route: '/starships/deployments'
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
  v-navigation-drawer(permanent, fixed, app, clipped)
    v-list.dense
      v-list-tile(v-for="item in items", :key="item.title", :to="item.route" :exact="item.route === '/starships'")

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
