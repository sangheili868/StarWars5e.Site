<template lang="pug">
  v-app
    MainToolbar
    router-view(name="navigation")
    v-content(:class="$style.content")
      v-container(fluid)
        router-view
    v-footer(app)
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MainToolbar from '@/components/MainToolbar.vue'
  import HandbookNavigation from '@/pages/Handbook/HandbookNavigation.vue'

  @Component({
    components: {
      MainToolbar,
      HandbookNavigation
    }
  })
  export default class App extends Vue {

  }
</script>

<style module lang="scss">
  @import '@/assets/styles/global.scss';

  .content {
    text-align: center;
    background: $backgroundGradient;
  }
</style>
