import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { DeploymentType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'depoyment' })
export default class Deployments extends VuexModule {
  depoyments: DeploymentType[] = []

  @MutationAction({ mutate: ['depoyments'] })
  async fetchDeployments () {
    return {
      depoyments: await fetchFromCache((this as any).state.depoyment, 'StarshipDeployment')
    }
  }
}
