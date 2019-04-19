<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdown from 'vue-markdown'

  const handbookBlobsModule = namespace('handbookBlobs')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class HandbookChapter extends Vue {
    @handbookBlobsModule.State handbookBlobs!: { [key: string]: string }
    @handbookBlobsModule.Action fetchHandbookBlob!: (chapter: string) => void

    @Prop(String) readonly chapter!: string

    chapterMap: { [key: string]: string } = {
      introduction: 'Introduction',
      stepByStep: 'Step-By-Step Characters',
      classes: 'classes',
      backgrounds: 'Personality and Backgrounds',
      equipment: 'Equipment',
      customization: 'Customization Options',
      abilityScores: 'Using Ability Scores',
      adventuring: 'Adventuring',
      combat: 'Combat',
      casting: 'Force- and Tech-casting',
      conditions: 'Appendix A: Conditions',
      variantRules: 'Appendix B: Recommended Variant Rules'
    }

    created () {
      this.fetchHandbookBlob(this.blobName)
    }

    @Watch('$route')
    fetchData () {
      this.fetchHandbookBlob(this.blobName)
    }

    get blobName () {
      return this.chapterMap[this.chapter]
    }

    get blob () {
      return this.handbookBlobs[this.blobName]
    }
  }
</script>

<template lang="pug">
  VueMarkdown(:source="blob").text-xs-left
</template>
