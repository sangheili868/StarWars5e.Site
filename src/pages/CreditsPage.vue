<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'
  import VueMarkdown from 'vue-markdown'

  const blobsModule = namespace('blobs')

  @Component({
    components: {
      VueMarkdown,
      Loading
    }
  })
  export default class CreditsPage extends Vue {
    @blobsModule.State creditsBlob!: string
    @blobsModule.Action fetchCreditsBlob!: () => void

    created () {
      this.fetchCreditsBlob()
    }
  }
</script>

<template lang="pug">
  VueMarkdown(v-if="creditsBlob", :source="creditsBlob")
  Loading(v-else)
</template>
