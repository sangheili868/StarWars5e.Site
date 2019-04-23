<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ClassType, DeploymentType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'

  const deploymentsModule = namespace('deployments')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class StarshipDeploymentDetails extends Vue {
    @deploymentsModule.State deployments!: DeploymentType[]
    @deploymentsModule.Action fetchDeployments!: () => void

    @Prop(String) readonly deploymentName!: string

    created () {
      this.fetchDeployments()
    }

    get deploymentData () {
      return this.deployments.find(({ name }) => name === this.deploymentName)
    }
  }
</script>

<template lang="pug">
  div( v-if="deploymentData" ).text-xs-left
    h1 {{ deploymentData.name }}
    VueMarkdown {{ deploymentData.flavorText }}
    VueMarkdown {{ deploymentData.featureText }}
</template>
