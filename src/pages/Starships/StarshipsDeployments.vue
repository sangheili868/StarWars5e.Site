<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { DeploymentType } from '@/types.ts'
  import CardSet from '@/components/CardSet.vue'
  import Loading from '@/components/Loading.vue'

  const deploymentsModule = namespace('deployments')

  @Component({
    components: {
      Loading,
      CardSet
    }
  })
  export default class StarshipsDeployments extends Vue {
    @deploymentsModule.State deployments!: DeploymentType[]
    @deploymentsModule.Action fetchDeployments!: () => void

    created () {
      this.fetchDeployments()
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
    h1 Starship Deployments
    CardSet(:cards="deploymentsWithLinks")
      template(v-slot="{ card }")
        v-card-text(primary-title)
          h3 {{ card.name }}
          div.text-xs-left
            p {{ card.description }}
    Loading(v-if="!deployments.length")
</template>
