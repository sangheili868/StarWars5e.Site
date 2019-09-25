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
  export default class CharactersVariantRulesDetail extends Vue {
    @blobsModule.State variantRuleBlobs!: any[]
    @blobsModule.Action fetchVariantRuleBlobs!: () => void
    @Prop(String) readonly variantRuleName!: string

    created () {
      this.fetchVariantRuleBlobs()
    }

    get title () {
        return this.variantRuleName + Vue.prototype.$titleSuffix
    }

    get blob () {
      return this.variantRuleBlobs.find(({ chapterName }) => chapterName === this.variantRuleName)
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(:title="title")
    div(v-if="blob")
      h1.text-left {{blob.chapterName}}
      VueMarkdown(:source="blob.contentMarkdown").text-left
      slot
    Loading(v-else)
</template>
