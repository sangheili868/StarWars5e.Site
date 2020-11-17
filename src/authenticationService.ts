import * as msal from '@azure/msal-browser'
import store from './store'

const authConfig = {
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

export default class AuthenticationService {
  public msal: msal.PublicClientApplication

  constructor () {
    this.msal = new msal.PublicClientApplication(msalConfig)

    this.msal.handleRedirectPromise().then((tokenResponse: any) => {
      if (tokenResponse && tokenResponse.accessToken) {
        store.commit('ui/updateIsLoggedIn', true)
      }
      store.commit('ui/updateAuthLoading', false)
    }).catch((error: any) => {
      console.log('Token failure: ' + JSON.stringify(error))
    })
  }

  public async signIn () {
    store.commit('ui/updateAuthLoading', true)
    var currentAccount = this.msal.getAllAccounts()[0]

    var tokenRequest = {
      account: currentAccount,
      scopes: authConfig.scopes
    }

    try {
      await this.msal.acquireTokenSilent(tokenRequest)
      store.commit('ui/updateIsLoggedIn', true)
      store.commit('ui/updateAuthLoading', false)
    } catch (tokenError) {
      try {
        await this.msal.acquireTokenRedirect(tokenRequest)
      } catch (tokenRedirectError) {
        console.log('Problem getting token with redirect flow: ' + tokenRedirectError)
      }
    }
  }

  public async signOut () {
    store.commit('ui/updateIsLoggedIn', false)
    store.commit('ui/updateAuthLoading', true)
    await this.msal.logout()
  }

  public async getAccessTokenQuietly (): Promise<string> {
    var currentAccount = this.msal.getAllAccounts()[0]

    if (!currentAccount) return ''

    var tokenRequest = {
      account: currentAccount,
      scopes: authConfig.scopes
    }

    try {
      var accessToken = (await this.msal.acquireTokenSilent(tokenRequest)).accessToken
      store.commit('ui/updateIsLoggedIn', true)
      return accessToken
    } catch (tokenError) {
      store.commit('ui/updateIsLoggedIn', false)
      return ''
    }
  }
}
