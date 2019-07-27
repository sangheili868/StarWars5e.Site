import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { AuthType } from '@/types'

@Module({ namespaced: true, name: 'auth' })
export default class Auth extends VuexModule {
  auth: AuthType = {
    accessToken: '',
    accessTokenExpiration: 0,
    refreshToken: '',
    acessTokenExpirationDate: new Date()
  }

  @MutationAction({ mutate: ['auth'] })
  async storeAuth (auth: AuthType) {
    let t = new Date()
    t.setSeconds(t.getSeconds() + auth.accessTokenExpiration)
    return {
      auth: {
        ...auth,
        accessTokenExpirationDate: t
      }
    }
  }
}
