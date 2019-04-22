<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MainToolbar from '@/components/MainToolbar.vue'
  import HandbookNavigation from '@/pages/Handbook/HandbookNavigation.vue'
  import StarshipNavigation from '@/pages/Starships/StarshipNavigation.vue'

  @Component({
    components: {
      MainToolbar,
      HandbookNavigation,
      StarshipNavigation
    }
  })
  export default class App extends Vue {

  }
</script>

<template lang="pug">
  v-app
    MainToolbar
    router-view(name="navigation")
    v-content(:class="$style.content")
      v-container(fluid)
        router-view
</template>

<style module lang="scss">
  @import '@/assets/styles/global.scss';

  .content {
    text-align: center;
    background: $backgroundGradient;
  }
</style>
