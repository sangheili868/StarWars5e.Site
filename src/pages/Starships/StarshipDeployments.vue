<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdown from 'vue-markdown'
  import { DeploymentType } from '@/types.ts'

  const deploymentsModule = namespace('deployments')
  const blobsModule = namespace('blobs')

  @Component({
    components: {
      VueMarkdown
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
  }
</script>

<template lang="pug">
  div
    VueMarkdown(:source="blob").text-xs-left
    v-container(grid-list-lg, fluid)
      v-layout(row, wrap, justify-center)
        v-flex(v-for="deployment in this.deployments", :key="deployment.name", d-flex).xs12.sm6.md4
          v-card(:to="`deployments/${deployment.name}`", hover, exact).ma-2
            v-card-text(primary-title)
              h3 {{ deployment.name }}
              div.text-xs-left
                p {{ deployment.description }}
</template>
