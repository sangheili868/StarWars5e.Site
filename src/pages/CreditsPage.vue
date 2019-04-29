<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'

  const creditsModule = namespace('credits')

  @Component({
    components: {
      Loading
    }
  })
  export default class CreditsPage extends Vue {
    @creditsModule.State credits!: string[]
    @creditsModule.Action fetchCredits!: () => void

    created () {
      this.fetchCredits()
    }
  }
</script>

<template lang="pug">
  div
    h1 Credits
    div(v-if="credits", :class="$style.credits")
      div(v-for="credit in credits", :key="credit", :class="$style.credit") {{ credit }}
    Loading(v-else)
</template>

<style module lang="scss">
  .credits {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .credit {
      margin: 5px;
      min-width: 150px;
      text-align: left;
    }
  }
</style>
