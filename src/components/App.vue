<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MainToolbar from '@/components/MainToolbar.vue'
  import HandbookNavigation from '@/pages/Handbook/HandbookNavigation.vue'
  import StarshipNavigation from '@/pages/Starships/StarshipNavigation.vue'
  import FragmentModal from '@/components/FragmentModal.vue'

  @Component({
    components: {
      MainToolbar,
      HandbookNavigation,
      StarshipNavigation,
      FragmentModal
    }
  })
  export default class App extends Vue {
  }
</script>

<template lang="pug">
  v-app
    MainToolbar
    router-view(name="navigation")
    FragmentModal
    v-content(:class="$style.content")
      v-container(fluid)
        router-view
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .content {
    text-align: center;
    background: $backgroundGradient;
    font-family: 'Open Sans', sans-serif;
  }
</style>
