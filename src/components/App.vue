<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MainToolbar from '@/components/MainToolbar.vue'
  import FragmentModal from '@/components/FragmentModal.vue'

  @Component({
    components: {
      MainToolbar,
      FragmentModal
    }
  })
  export default class App extends Vue {
  }
</script>

<template lang="pug">
  v-app
    MainToolbar
    FragmentModal
    v-content(:class="$style.content")
      v-container(fluid)
        router-view
    router-view(name="navigation")
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .content {
    text-align: center;
    background: $backgroundGradient;
    font-family: 'Open Sans', sans-serif;
  }
</style>
