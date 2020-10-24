<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdown from 'vue-markdown'
  import Loading from '@/components/Loading.vue'
  import BackButton from '@/components/BackButton.vue'

  const blobsModule = namespace('blobs')

  @Component({
    components: {
      VueMarkdown,
      BackButton,
      Loading
    }
  })
  export default class ExpandedContentDetail extends Vue {
    @blobsModule.State expandedContentBlobs!: any[]
    @blobsModule.Action fetchExpandedContentBlobs!: () => void
    @Prop(String) readonly expandedContentName!: string

    created () {
      this.fetchExpandedContentBlobs()
    }

    get title () {
        return this.expandedContentName + Vue.prototype.$titleSuffix
    }

    get blob () {
      return this.expandedContentBlobs.find(({ chapterName }) => chapterName === this.expandedContentName)
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(:title="title")
    BackButton
    div(v-if="blob")
      h1.text-left {{blob.chapterName}}
      VueMarkdown(:source="blob.contentMarkdown").text-left
      slot
    Loading(v-else)
</template>
