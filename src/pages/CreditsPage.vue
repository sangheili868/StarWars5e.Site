<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { State, Action } from 'vuex-class'

  @Component
  export default class CreditsPage extends Vue {
    @State credits!: string[]
    @Action fetchCredits!: () => void

    get creditsList () {
      return this.credits.join(', ')
    }

    created () {
      this.fetchCredits()
    }
  }
</script>

<template lang="pug">
  div
    h1 Credits
    | {{ this.creditsList }}
</template>
