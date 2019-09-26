<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdown from 'vue-markdown'
  import { DeploymentType } from '@/types/starshipTypes.ts'
  import CardSet from '@/components/CardSet.vue'
  import Loading from '@/components/Loading.vue'

  const deploymentsModule = namespace('deployments')
  const blobsModule = namespace('blobs')

  @Component({
    components: {
      VueMarkdown,
      Loading,
      CardSet
    }
  })
  export default class StarshipDeployments extends Vue {
    @deploymentsModule.State deployments!: DeploymentType[]
    @deploymentsModule.Action fetchDeployments!: () => void
    @blobsModule.State starshipBlobs!: { [key: string]: string }
    @blobsModule.Action fetchStarshipBlob!: (chapter: string) => void

    created () {
      this.fetchStarshipBlob('Deployments')
      this.fetchDeployments()
    }

    get blob () {
      return this.starshipBlobs['Deployments']
    }

    get deploymentsWithLinks () {
      return this.deployments.map(deployment => ({
        ...deployment,
        to: `deployments/${deployment.name}`
      }))
    }
  }
</script>

<template lang="pug">
  div
    VueMarkdown(:source="blob").text-left
    CardSet(:cards="deploymentsWithLinks")
      template(v-slot="{ card }")
        v-card-text(primary-title)
          h3 {{ card.name }}
          div.text-left
            p {{ card.description }}
    Loading(v-if="!blob || !deployments.length")
</template>
