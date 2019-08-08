<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'

  @Component({
    components: {
      NavigationDrawer
    }
  })
  export default class CitiesNavigation extends Vue {
    items = [
      // {
      //   title: 'Introduction',
      //   icon: 'fa-journal-whills',
      //   route: '/cities'
      // },
      // {
      //   title: 'Creating Encounters',
      //   icon: 'fa-pencil-ruler',
      //   route: '/cities/creatingEncounters'
      // },
      {
        title: 'More coming soon...',
        icon: 'fa-toolbox'
      }
      // {
      //   title: 'Changelog',
      //   icon: 'fa-list',
      //   route: '/cities/changelog'
      // }
    ]
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/rules/cities")
</template>
