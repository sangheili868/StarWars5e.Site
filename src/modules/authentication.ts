import Vue from 'vue'
import { Module, VuexModule, MutationAction, Action } from 'vuex-module-decorators'
import * as msalBrowser from '@azure/msal-browser'
import { AxiosRequestConfig } from 'axios'
import _ from 'lodash'

@Module({ namespaced: true, name: 'authentication' })
export default class Authentication extends VuexModule {
  accessToken: string | null = null
  isAuthLoading: boolean = true

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
  async setAccessToken (accessToken?: string) {
    return { accessToken }
  }

  @MutationAction({ mutate: ['isAuthLoading'] })
  async setIsAuthLoading (isAuthLoading?: boolean) {
    return { isAuthLoading }
  }

  @MutationAction({ mutate: ['accessToken', 'isAuthLoading'] })
  async fetchAccessToken () {
    const tokenRequest = { account: Vue.prototype.$msal.getAllAccounts()[0], scopes: Vue.prototype.$authConfig.scopes }
    let accessToken: string | null = null

    try {
      var tokenResponse = await (Vue.prototype.$msal as msalBrowser.PublicClientApplication).acquireTokenSilent(tokenRequest)
      accessToken = tokenResponse.accessToken
    } catch (tokenError) {
      try {
        await Vue.prototype.$msal.acquireTokenRedirect(tokenRequest)
      } catch (tokenRedirectError) {
        console.error('Problem getting token with redirect flow: ' + tokenRedirectError)
      }
    }

    return { accessToken: accessToken || (this as any).state.accessToken, isAuthLoading: false }
  }
}
