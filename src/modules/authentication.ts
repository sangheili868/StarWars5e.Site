import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'authentication' })
export default class Authentication extends VuexModule {
  accessToken: string | null = null

  @Mutation
  async updateAccessToken (accessToken: string) {
    this.accessToken = accessToken
  }
}
