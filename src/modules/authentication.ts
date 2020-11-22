import { Module, VuexModule, Mutation, MutationAction } from 'vuex-module-decorators'
import * as msalBrowser from '@azure/msal-browser'
import axios, { AxiosInstance } from 'axios'

export const authConfig = {
  names: {
    signUpSignIn: 'B2C_1_signupin'
    // forgotPassword: "B2C_1_reset",
    // editProfile: "B2C_1_edit_profile"
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://sw5edev.b2clogin.com/sw5edev.onmicrosoft.com/B2C_1_signupin'
    }
    // forgotPassword: {
    //     authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_reset",
    // },
    // editProfile: {
    //     authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_edit_profile"
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
    // postLogoutRedirectUri: 'http://localhost:8080/login',
    requireAuthOnInitialize: false
  },
  cache: {
    cacheLocation: 'localStorage'
  }
}

declare global {
    interface Window { msal: msalBrowser.PublicClientApplication; }
}

@Module({ namespaced: true, name: 'authentication' })
export default class Authentication extends VuexModule {
  accessToken: string | null = null

  get authedAxios (): AxiosInstance {
    return axios.create({
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
  }

  get account (): msalBrowser.AccountInfo {
    return window.msal.getAllAccounts()[0]
  }

  @MutationAction({ mutate: ['accessToken'] })
  async initMSAL () {
      if (!window.msal) window.msal = new msalBrowser.PublicClientApplication(msalConfig)
      let accessToken: string | null = null
      await window.msal.handleRedirectPromise().then(tokenResponse => {
        if (tokenResponse && tokenResponse.accessToken) {
          accessToken = tokenResponse.accessToken
        }
      }).catch((error) => console.error('Token failure: ' + JSON.stringify(error)))
      return { accessToken }
    }

  @MutationAction({ mutate: ['accessToken'] })
  async setAccessToken (accessToken: string) {
    return { accessToken }
  }
}
