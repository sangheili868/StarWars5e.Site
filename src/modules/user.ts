import axios, { AxiosRequestConfig } from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { UserType } from '@/types/userTypes'

@Module({ namespaced: true, name: 'user' })
export default class User extends VuexModule {
  user: UserType | null = null

  get authenticationHeader (): (myThis: any) => Promise<AxiosRequestConfig> {
    return async (myThis) => {
      await myThis.dispatch('authentication/fetchAccessToken', {}, { root: 'true' })
      return myThis.rootGetters['authentication/axiosHeader']
    }
  }

  @MutationAction({ mutate: ['user'] })
  async postUser (user: UserType) {
    const header = await (this as any).getters.authenticationHeader(this) as AxiosRequestConfig

    let returnedUser = (await axios.post(`${process.env.VUE_APP_sw5eapiurl}/api/user`, { username: user.username }, header)).data
    return { user: returnedUser }
  }

  @MutationAction({ mutate: ['user'] })
  async getUser () {
    const header = await (this as any).getters.authenticationHeader(this) as AxiosRequestConfig

    let returnedUser = (await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/user`, header)).data
    return { user: returnedUser }
  }
}
