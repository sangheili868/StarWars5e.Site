import Vue from 'vue'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import * as msalBrowser from '@azure/msal-browser'
import { AxiosRequestConfig } from 'axios'

export const authConfig = {
  names: {
    signUpSignIn: 'B2C_1_signupin',
    forgotPassword: 'B2C_1_reset'
    // editProfile: "B2C_1_edit_profile"
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://sw5edev.b2clogin.com/sw5edev.onmicrosoft.com/B2C_1_signupin'
    },
    forgotPassword: {
        authority: 'https://sw5edev.b2clogin.com/sw5edev.onmicrosoft.com/B2C_1_reset'
    }
    // editProfile: {
    //     authority: "https://sw5edev.b2clogin.com/sw5edev.onmicrosoft.com/B2C_1_edit_profile"
    // }
  },
  authorityDomain: 'sw5edev.b2clogin.com',
  scopes: [
    'https://sw5edev.onmicrosoft.com/api/api.readCharacterData',
    'https://sw5edev.onmicrosoft.com/api/api.writeCharacterData',
    'offline_access'
  ]
}

const msalConfig = {
  auth: {
    clientId: 'd172ddd0-140a-4fab-b9b1-82241d7c3f03',
    redirectUri: 'http://localhost:8080/profile',
    knownAuthorities: [authConfig.authorityDomain],
    authority: authConfig.authorities.signUpSignIn.authority,
    requireAuthOnInitialize: false
  },
  cache: {
    cacheLocation: 'localStorage'
  }
}

@Module({ namespaced: true, name: 'authentication' })
export default class Authentication extends VuexModule {
  accessToken: string | null = null

  get axiosHeader (): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }
  }

  get account (): msalBrowser.AccountInfo {
    return Vue.prototype.$msal.getAllAccounts()[0]
  }

  get isLoggedIn (): Boolean {
    return this.accessToken ? this.accessToken.length > 0 : false
  }

  @MutationAction({ mutate: ['accessToken'] })
  async initMSAL () {
      if (!Vue.prototype.$msal) Vue.prototype.$msal = new msalBrowser.PublicClientApplication(msalConfig)
      let accessToken: string | null = null
      await (Vue.prototype.$msal as msalBrowser.PublicClientApplication).handleRedirectPromise().then(tokenResponse => {
        if (tokenResponse && tokenResponse.accessToken) {
          accessToken = tokenResponse.accessToken
        }
      }).catch((error) => {
        if (error.errorMessage.includes('AADB2C90118')) {
          try {
            Vue.prototype.$msal.loginRedirect(authConfig.authorities.forgotPassword)
          } catch (err) {
              console.error(err)
          }
        } else {
          console.error('Token failure: ' + JSON.stringify(error))
        }
      })
      return { accessToken }
    }

  @MutationAction({ mutate: ['accessToken'] })
  async setAccessToken (accessToken?: string) {
    return { accessToken }
  }
}
