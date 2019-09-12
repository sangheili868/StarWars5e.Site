import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { DeploymentType } from '@/types/starshipTypes.ts'

@Module({ namespaced: true, name: 'deployments' })
export default class Deployments extends VuexModule {
  deployments: DeploymentType[] = []

  @MutationAction({ mutate: ['deployments'] })
  async fetchDeployments () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/StarshipDeployment`)
    return {
      deployments: results.data
    }
  }
}
