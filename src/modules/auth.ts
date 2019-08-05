import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { AuthType } from '@/types'
import Cookies from 'js-cookie'

@Module({ namespaced: true, name: 'auth' })
export default class Auth extends VuexModule {
  auth: AuthType = {
    userName: '',
    accessTokenExpiration: 0,
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
