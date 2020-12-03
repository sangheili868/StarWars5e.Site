<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MainToolbar from '@/components/MainToolbar.vue'
  import FragmentModal from '@/components/FragmentModal.vue'
  import { namespace } from 'vuex-class'

  const uiModule = namespace('ui')
  const dataVersionsModule = namespace('dataVersions')

  @Component({
    components: {
      MainToolbar,
      FragmentModal
    }
  })
  export default class App extends Vue {
    @uiModule.State isDarkSide!: boolean
    @dataVersionsModule.State hasInternet!: boolean
    @dataVersionsModule.Action fetchDataVersions!: () => Promise<any>
    isDataLoaded = false

    created () {
      this.fetchDataVersions().then(() => { this.isDataLoaded = true })
    }
  }
</script>

<template lang="pug">
  v-app(:dark="isDarkSide")
    MainToolbar
    FragmentModal(v-if="isDataLoaded")
    v-content(:class="[ $style.content, $style.noPadding, { [$style.darkSide]: isDarkSide } ]")
      v-alert(v-if="!hasInternet", type="error", :class="$style.alert") Warning: Could not connect to database. Check your internet connection.
      v-container(fluid, :class="[$style.noPadding, { [$style.alertMargin]: !hasInternet }]")
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

    .alert {
      position: fixed;
      z-index: 5;
      width: 100%;
    }

    .alertMargin {
      margin-top: 72px;
    }
  }

  @media print {
    .noPadding {
      padding: 0 !important;
    }
  }
</style>
