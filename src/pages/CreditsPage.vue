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

    get creditsList () {
      return this.credits && this.credits.join(', ')
    }

    created () {
      this.fetchCredits()
    }
  }
</script>

<template lang="pug">
  div
    h1 Credits
    | {{ creditsList }}
    Loading(v-if="!creditsList")
</template>
