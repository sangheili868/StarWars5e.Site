import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'authentication' })
export default class Authentication extends VuexModule {
  accessToken: string = ''

  @MutationAction({ mutate: ['accessToken'] })
  async updateAccessToken (accessToken: string) {
    return { accessToken }
  }
}
