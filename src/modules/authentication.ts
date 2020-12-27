import Vue from 'vue'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import * as msalBrowser from '@azure/msal-browser'
import { AxiosRequestConfig } from 'axios'

const domain = process.env.VUE_APP_sw5eauthdomain

export const authConfig = {
  names: {
    signUpSignIn: 'B2C_1_signupin',
    forgotPassword: 'B2C_1_reset'
    // editProfile: "B2C_1_edit_profile"
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${domain}.b2clogin.com/${domain}.onmicrosoft.com/B2C_1_signupin`
    },
    forgotPassword: {
        authority: `https://${domain}.b2clogin.com/${domain}.onmicrosoft.com/B2C_1_reset`
    }
    // editProfile: {
    //     authority: "https://sw5edev.b2clogin.com/sw5edev.onmicrosoft.com/B2C_1_edit_profile"
    // }
  },
  authorityDomain: `${domain}.b2clogin.com`,
  scopes: [
    `https://${domain}.onmicrosoft.com/api/api.readCharacterData`,
    `https://${domain}.onmicrosoft.com/api/api.writeCharacterData`,
    'offline_access'
  ]
}

const msalConfig = {
  auth: {
    clientId: `${process.env.VUE_APP_clientid}`,
    redirectUri: `${process.env.VUE_APP_baseurl}/profile`,
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

  @MutationAction({ mutate: ['accessToken'] })
  async fetchAccessToken () {
    const tokenRequest = { account: this.account, scopes: authConfig.scopes }
    let accessToken: string | null = null

    try {
      await (Vue.prototype.$msal as msalBrowser.PublicClientApplication).acquireTokenSilent(tokenRequest).then(tokenResponse => {
        accessToken = tokenResponse.accessToken
      })
    } catch (tokenError) {
      try {
        Vue.prototype.$msal.acquireTokenRedirect(tokenRequest).then(
        )
      } catch (tokenRedirectError) {
        console.error('Problem getting token with redirect flow: ' + tokenRedirectError)
      }
    }

    return { accessToken: accessToken || (this as any).state.accessToken }
  }
}
