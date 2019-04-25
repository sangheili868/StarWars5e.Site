<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
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
  export default class HandbookChapter extends Vue {
    @blobsModule.State handbookBlobs!: { [key: string]: string }
    @blobsModule.Action fetchHandbookBlob!: (chapter: string) => void

    @Prop(String) readonly chapter!: string

    chapterMap: { [key: string]: string } = {
      introduction: 'Introduction',
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
  div(v-if="blob")
    VueMarkdown(:source="blob").text-xs-left
    slot
  Loading(v-else)
</template>
