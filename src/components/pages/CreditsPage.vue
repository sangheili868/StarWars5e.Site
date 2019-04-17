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
  div(:class="$style.hello")
    h1 Star Wars
    h2 {{ this.creditsList }}
</template>

<style module lang="scss">
  .hello {
    color: #42b983;
  }
</style>
