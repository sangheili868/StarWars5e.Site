<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdownWithAnchors from '@/components/VueMarkdownWithAnchors.vue'
  import Loading from '@/components/Loading.vue'

  const blobsModule = namespace('blobs')

  @Component({
    components: {
      VueMarkdownWithAnchors,
      Loading
    }
  })
  export default class CitiesChapter extends Vue {
    // @blobsModule.State citiesBlobs!: { [key: string]: string }
    // @blobsModule.Action fetchCitiesBlob!: (chapter: string) => void

    @Prop(String) readonly chapter!: string

    chapterMap: { [key: string]: string } = {
      introduction: 'Introduction'
    }

    created () {
      // this.fetchCitiesBlob(this.blobName)
    }

    @Watch('$route')
    fetchData () {
      // this.fetchCitiesBlob(this.blobName)
    }

    get blobName () {
      return this.chapterMap[this.chapter] || 'Introduction'
    }

    get blob () {
      // const blob = this.citiesBlobs[this.blobName]
      const blob = '# Coming soon...'
      return blob && blob.replace(/\ufffd/g, ' - ')
    }
  }
</script>

<template lang="pug">
  div(v-if="blob")
    VueMarkdownWithAnchors(:source="blob").text-xs-left
    slot
  Loading(v-else)
</template>
