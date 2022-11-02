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
    v-main(:class="[ $style.content, $style.noPadding, { [$style.darkSide]: isDarkSide } ]")
      v-alert(v-if="!hasInternet", type="error", :class="$style.alert") Warning: Could not connect to database. Check your internet connection.
      v-alert(type="warning", :class="$style.alert").px-5
        div There will be some upcoming changes in management for SW5e and this website by the end of the year.
          a(href='https://www.reddit.com/r/sw5e/comments/yif45b/so_long_and_thanks_for_the_all_the_fish/').px-1.text-decoration-underline.primary--text.font-weight-bold Click here to read more about this change.
          | We are still working out exactly what this transition will entail, but our goal is for this to be a seamless as possible.
          | There shouldn't be any changes to this website when this transition happens.
          | Just in case, we recommend you #[strong.primary--text export your characters] to back them up, either as JSON files, Roll20 characters, or Foundry VTT characters.
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
      position: sticky;
      z-index: 2;
      width: 100%;
      font-size: 12px;
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
