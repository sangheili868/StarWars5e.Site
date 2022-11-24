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
    @uiModule.State hiddenNewManagementAlert!: boolean
    @dataVersionsModule.State hasInternet!: boolean
    @dataVersionsModule.Action fetchDataVersions!: () => Promise<any>
    @uiModule.Action toggleNewManagementAlert: boolean
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
      v-alert(v-if="!hasInternet", type="error", :class="$style.alert").d-print-none Warning: Could not connect to database. Check your internet connection.
      v-alert(v-if="!hiddenNewManagementAlert" type="warning", :class="$style.alert").d-print-none.px-5
        div sw5e.com is under new management!
          a(href='https://www.reddit.com/r/sw5e/comments/ym1kcd/sw5e_website_under_new_management_introducing/').px-1.text-decoration-underline.primary--text.font-weight-bold Click here to read more about Delta Squad.
          a(@click="toggleNewManagementAlert").float-right Acknowledge
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
