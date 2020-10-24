<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'
  import CardSet from '@/components/CardSet.vue'
  import BackButton from '@/components/BackButton.vue'

  const blobsModule = namespace('blobs')

  @Component({
    components: {
      Loading,
      BackButton,
      CardSet
    }
  })
  export default class ExpandedContent extends Vue {
    @blobsModule.State expandedContentBlobs!: any[]
    @blobsModule.Action fetchExpandedContentBlobs!: () => void

    created () {
      this.fetchExpandedContentBlobs()
    }

    get expandedContentBlobsWithLinks () {
      return this.expandedContentBlobs.map(expandedContentBlobs => ({
        ...expandedContentBlobs,
        to: `expandedContent/${expandedContentBlobs.chapterName}`
      }))
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    div(v-if="expandedContentBlobs.length")
      h1.text-left Expanded Content
      p.text-left
        | These are additional content to supplement the base books. None are required to
        | play, but some or all can be used to add a new flavor to your table. Click on any of them to learn more.
        br
        br
        | This is the raw form of this content, but it can also be found in the various tables in the Characters
        | or loot menus.
      CardSet(:cards="expandedContentBlobsWithLinks")
        template(v-slot="{ card }")
          v-card-text(primary-title)
            h4 {{ card.chapterName }}
    Loading(v-else)
</template>
