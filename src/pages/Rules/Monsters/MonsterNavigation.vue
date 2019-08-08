<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'

  @Component({
    components: {
      NavigationDrawer
    }
  })
  export default class MonsterNavigation extends Vue {
    items = [
      // {
      //   title: 'Introduction',
      //   icon: 'fa-journal-whills',
      //   route: '/monsters'
      // },
      // {
      //   title: 'Creating Encounters',
      //   icon: 'fa-pencil-ruler',
      //   route: '/monsters/creatingEncounters'
      // },
      {
        title: 'Monsters',
        icon: 'fa-paw',
        route: '/rules/monsters'
      },
      {
        title: 'More coming soon...',
        icon: 'fa-toolbox'
      }
      // {
      //   title: 'Changelog',
      //   icon: 'fa-list',
      //   route: '/monsters/changelog'
      // }
    ]
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/rules/monsters")
</template>
