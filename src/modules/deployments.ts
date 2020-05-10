import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { DeploymentType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'deployments' })
export default class Deployments extends VuexModule {
  deployments: DeploymentType[] = []

  @MutationAction({ mutate: ['deployments'] })
  async fetchDeployments () {
    return {
      deployments: await fetchFromCache((this as any).state.deployment, 'StarshipDeployment')
    }
  }
}
