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
  export default class StarshipChapter extends Vue {
    @handbookBlobsModule.State starshipBlobs!: { [key: string]: string }
    @handbookBlobsModule.Action fetchStarshipBlob!: (chapter: string) => void

    @Prop(String) readonly chapter!: string

    chapterMap: { [key: string]: string } = {
      introduction: 'Introduction',
      stepByStep: 'Step-By-Step Starships',
      deployments: 'Deployments',
      starships: 'Starships',
      modifications: 'Modifications',
      equipment: 'Equipment',
      customization: 'Customization Options',
      abilityScores: 'Using Ability Scores',
      adventuring: 'Adventuring',
      combat: 'Combat',
      conditions: 'Appendix A: Conditions'
    }

    created () {
      this.fetchStarshipBlob(this.blobName)
    }

    @Watch('$route')
    fetchData () {
      this.fetchStarshipBlob(this.blobName)
    }

    get blobName () {
      return this.chapterMap[this.chapter]
    }

    get blob () {
      return this.starshipBlobs[this.blobName]
    }
  }
</script>

<template lang="pug">
  VueMarkdown(:source="blob").text-xs-left
</template>