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
  export default class StarshipChapter extends Vue {
    @blobsModule.State starshipBlobs!: { [key: string]: string }
    @blobsModule.Action fetchStarshipBlob!: (chapter: string) => void

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
      generatingEncounters: 'Generating Encounters',
      conditions: 'Appendix A: Conditions',
      changelog: 'Changelog'
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
      const blob = this.starshipBlobs[this.blobName]
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
