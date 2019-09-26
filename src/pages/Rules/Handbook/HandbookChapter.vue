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
  export default class HandbookChapter extends Vue {
    @blobsModule.State handbookBlobs!: { [key: string]: string }
    @blobsModule.Action fetchHandbookBlob!: (chapter: string) => void

    @Prop(String) readonly chapter!: string

    chapterMap: { [key: string]: string } = {
      introduction: 'Introduction',
      whatsDifferent: 'Whats Different',
      stepByStep: 'Step-By-Step Characters',
      species: 'Species',
      classes: 'Classes',
      backgrounds: 'Personality and Backgrounds',
      equipment: 'Equipment',
      customization: 'Customization Options',
      abilityScores: 'Using Ability Scores',
      adventuring: 'Adventuring',
      combat: 'Combat',
      casting: 'Force- and Tech-casting',
      conditions: 'Appendix A: Conditions',
      variantRules: 'Appendix B: Recommended Variant Rules',
      changelog: 'Changelog'
    }

    created () {
      this.fetchHandbookBlob(this.blobName)
    }

    @Watch('$route')
    fetchData () {
      this.fetchHandbookBlob(this.blobName)
    }

    get title () {
        return this.chapterMap[this.chapter] + ' | Handbook' + Vue.prototype.$titleSuffix
    }

    get blobName () {
      return this.chapterMap[this.chapter]
    }

    get blob () {
      const blob = this.handbookBlobs[this.blobName]
      return blob && blob.replace(/\ufffd/g, '-')
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(:title="title")
    div(v-if="blob")
      VueMarkdownWithAnchors(:source="blob").text-left
      slot
    Loading(v-else)
</template>
