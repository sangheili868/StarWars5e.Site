<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'
  import CardSet from '@/components/CardSet.vue'
  import BackButton from '@/components/BackButton.vue'

  const blobsModule = namespace('blobs')

  @Component({
    components: {
      Loading,
      BackButton,
      CardSet
    }
  })
  export default class CharactersVariantRules extends Vue {
    @blobsModule.State variantRuleBlobs!: any[]
    @blobsModule.Action fetchVariantRuleBlobs!: () => void

    created () {
      this.fetchVariantRuleBlobs()
    }

    get variantRuleBlobsWithLinks () {
      return this.variantRuleBlobs.map(variantRuleBlob => ({
        ...variantRuleBlob,
        to: `additionalVariantRules/${variantRuleBlob.chapterName}`
      }))
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    div(v-if="variantRuleBlobs.length")
      h1.text-left Other Variant Rules
      p.text-left
        | These are various rules that change the game in interesting and significant ways. None are required in order to
        | play, but some or all can be used to add a new flavor to your table. Click on any of them to learn more.
      CardSet(:cards="variantRuleBlobsWithLinks")
        template(v-slot="{ card }")
          v-card-text(primary-title)
            h4 {{ card.chapterName }}
    Loading(v-else)
</template>
