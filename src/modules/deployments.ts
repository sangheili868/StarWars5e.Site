import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { DeploymentType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'deployments' })
export default class Deployments extends VuexModule {
  deployments: DeploymentType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['deployments', 'cachedVersion'] })
  async fetchDeployments () {
    const { data: deployments, cachedVersion } = await fetchFromCache(this, 'deployments', 'StarshipDeployment')
    return { deployments, cachedVersion }
  }
}
