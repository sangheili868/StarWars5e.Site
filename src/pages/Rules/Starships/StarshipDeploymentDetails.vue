<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { DeploymentType } from '@/types/starshipTypes.ts'
  import VueMarkdown from 'vue-markdown'
  import Loading from '@/components/Loading.vue'
  import BackButton from '@/components/BackButton.vue'

  const deploymentsModule = namespace('deployments')

  @Component({
    components: {
      VueMarkdown,
      BackButton,
      Loading
    }
  })
  export default class StarshipDeploymentDetails extends Vue {
    @deploymentsModule.State deployments!: DeploymentType[]
    @deploymentsModule.Action fetchDeployments!: () => void

    @Prop(String) readonly deploymentName!: string

    created () {
      this.fetchDeployments()
    }

    get title () {
      return this.deploymentName + ' | Starships' + Vue.prototype.$titleSuffix
    }

    get deploymentData () {
      return this.deployments.find(({ name }) => name === this.deploymentName)
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(:title="title")
    BackButton
    div( v-if="deploymentData" ).text-left
      h1 {{ deploymentData.name }}
      VueMarkdown(:source="deploymentData.flavorText")
      VueMarkdown(:source="deploymentData.featureText")
    Loading(v-else)
</template>
