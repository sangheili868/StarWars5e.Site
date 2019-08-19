<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MainToolbar from '@/components/MainToolbar.vue'
  import FragmentModal from '@/components/FragmentModal.vue'
  import { namespace } from 'vuex-class'

  const uiModule = namespace('ui')

  @Component({
    components: {
      MainToolbar,
      FragmentModal
    }
  })
  export default class App extends Vue {
    @uiModule.State isDarkSide!: boolean
  }
</script>

<template lang="pug">
  v-app(:dark="isDarkSide")
    MainToolbar
    FragmentModal
    v-content(:class="[ $style.content, { [$style.darkSide]: isDarkSide } ]")
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

    &.darkSide {
      background: $darkSideGradient;
    }
  }
</style>
