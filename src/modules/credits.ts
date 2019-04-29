import axios from 'axios'
import _ from 'lodash'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'credits' })
export default class Credits extends VuexModule {
  credits: String[] = []

  @MutationAction({ mutate: ['credits'] })
  async fetchCredits () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Credit`)
    return {
      credits: _(results.data)
        .filter((credit: any) => credit.partitionKey === 'Credit')
        .map('rowKey')
        .value()
    }
  }
}
