<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdown from 'vue-markdown'
  import Loading from '@/components/Loading.vue'

  const blobsModule = namespace('blobs')

  @Component({
    components: {
      VueMarkdown,
      Loading
    }
  })
  export default class VariantRules extends Vue {
    @blobsModule.State variantRuleBlobs!: any[]
    @blobsModule.Action fetchVariantRuleBlobs!: () => void

    created () {
      this.fetchVariantRuleBlobs()
    }
  }
</script>

<template lang="pug">
  div(v-if="variantRuleBlobs.length")
    h1.text-xs-left Other Variant Rules
    p.text-xs-left
      | These are various rules that change the game in interesting and significant ways. None are required in order to
      | play, but some or all can be used to add a new flavor to your table. Click on any of them to learn more.
    v-container(grid-list-lg, fluid)
      v-layout(row, wrap, justify-center)
        v-flex(v-for="variantRule in variantRuleBlobs", :key="variantRule.chapterName", d-flex).xs12.sm6.md4
          v-card(:to="`otherVariantRules/${variantRule.chapterName}`", hover, exact).ma-2
            v-card-text(primary-title)
              h4 {{ variantRule.chapterName }}
  Loading(v-else)
</template>
