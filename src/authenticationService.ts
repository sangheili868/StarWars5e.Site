import * as msal from '@azure/msal-browser'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// import AuthenticationModule from '@/modules/authentication'

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
    'https://sw5edev.onmicrosoft.com/api/api.readCharacterData',
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
  }
}

const authenticationModule = namespace('authentication')

@Component
export default class AuthenticationService extends Vue {
  @authenticationModule.Action updateAccessToken!: (accessToken: string) => void
  @authenticationModule.State accessToken!: string

  public msal: msal.PublicClientApplication

  public createMSAL () {
    this.msal = new msal.PublicClientApplication(msalConfig)

    this.updateAccessToken('test')
    this.msal.handleRedirectPromise().then((tokenResponse: any) => {
      if (tokenResponse && tokenResponse.accessToken) {
        this.updateAccessToken(tokenResponse.accessToken)
      }
    }).catch((error: any) => {
      console.log('Token failure: ' + JSON.stringify(error))
    })
  }

  public async signIn () {
    var currentAccount = this.msal.getAllAccounts()[0]

    var tokenRequest = {
      account: currentAccount,
      scopes: authConfig.scopes
    }

    try {
      // Vue.prototype.$msal.accessToken = (await this.msal.acquireTokenSilent(tokenRequest)).accessToken
      this.updateAccessToken((await this.msal.acquireTokenSilent(tokenRequest)).accessToken)
    } catch (tokenError) {
      try {
        await this.msal.acquireTokenRedirect(tokenRequest)
      } catch (tokenRedirectError) {
        console.log('Problem getting token with redirect flow: ' + tokenRedirectError)
      }
    }
  }

  public signOut () {
    this.msal.logout()
  }
}

// const msalApplication: Msal = new msal.PublicClientApplication(msalConfig)

// msalApplication.signIn = async () => {
//   var currentAccount = msalApplication.getAllAccounts()[0]

//   var tokenRequest = {
//     account: currentAccount,
//     scopes: authConfig.scopes
//   }

//   try {
//     Vue.prototype.$msal.accessToken = (await msalApplication.acquireTokenSilent(tokenRequest)).accessToken
//   } catch (tokenError) {
//     try {
//       await msalApplication.acquireTokenRedirect(tokenRequest)
//     } catch (tokenRedirectError) {
//       console.log('Problem getting token with redirect flow: ' + tokenRedirectError)
//     }
//   }
// }

// msalApplication.signOut = () => {
//   msalApplication.logout()
// }

// msalApplication.handleRedirectPromise().then((tokenResponse: any) => {
//   if (tokenResponse && tokenResponse.accessToken) authenticationModule. = tokenResponse.accessToken
// }).catch((error: any) => {
//   console.log('Token failure: ' + JSON.stringify(error))
// })

// export default msalApplication
