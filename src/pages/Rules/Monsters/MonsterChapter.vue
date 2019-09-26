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
  export default class MonsterChapter extends Vue {
    @blobsModule.State monsterBlobs!: { [key: string]: string }
    @blobsModule.Action fetchMonsterBlob!: (chapter: string) => void

    @Prop(String) readonly chapter!: string

    chapterMap: { [key: string]: string } = {
      introduction: 'Introduction',
      creatingEncounters: 'Creating Encounters',
      monsters: 'Monsters'
    }

    created () {
      this.fetchMonsterBlob(this.blobName)
    }

    @Watch('$route')
    fetchData () {
      this.fetchMonsterBlob(this.blobName)
    }

    get blobName () {
      return this.chapterMap[this.chapter]
    }

    get blob () {
      const blob = this.monsterBlobs[this.blobName]
      return blob && blob.replace(/\ufffd/g, ' - ')
    }
  }
</script>

<template lang="pug">
  div(v-if="blob")
    VueMarkdownWithAnchors(:source="blob").text-left
    slot
  Loading(v-else)
</template>
