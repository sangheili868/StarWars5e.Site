import Vue from 'vue'
import App from './components/App.vue'
import router from './pages/router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import './registerServiceWorker'
import '@/assets/styles/global.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import vueHeadful from 'vue-headful'
import VueSessionStorage from 'vue-sessionstorage'
import VueAppInsights from 'vue-application-insights'
import * as msalBrowser from '@azure/msal-browser'

Vue.use(VueSessionStorage)

Vue.component('vue-headful', vueHeadful)
Vue.prototype.$titleSuffix = ' | SW5E'

Vue.config.productionTip = false

Vue.prototype.$sw5eauthdomain = process.env.VUE_APP_sw5eauthdomain
Vue.prototype.$msalConfig = {
  auth: {
    clientId: `${process.env.VUE_APP_clientid}`,
    redirectUri: `${process.env.VUE_APP_baseurl}/profile`,
    knownAuthorities: [`${Vue.prototype.$sw5eauthdomain}.b2clogin.com`],
    authority: `https://${Vue.prototype.$sw5eauthdomain}.b2clogin.com/${Vue.prototype.$sw5eauthdomain}.onmicrosoft.com/B2C_1_signupin`,
    requireAuthOnInitialize: false
  },
  cache: {
    cacheLocation: 'localStorage'
  }
}
Vue.prototype.$authConfig = {
  names: {
    signUpSignIn: 'B2C_1_signupin',
    forgotPassword: 'B2C_1_reset',
    editProfile: 'B2C_1_profile'
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${Vue.prototype.$sw5eauthdomain}.b2clogin.com/${Vue.prototype.$sw5eauthdomain}.onmicrosoft.com/B2C_1_signupin`
    },
    forgotPassword: {
        authority: `https://${Vue.prototype.$sw5eauthdomain}.b2clogin.com/${Vue.prototype.$sw5eauthdomain}.onmicrosoft.com/B2C_1_reset`
    },
    editProfile: {
        authority: `https://${Vue.prototype.$sw5eauthdomain}.b2clogin.com/${Vue.prototype.$sw5eauthdomain}.onmicrosoft.com/B2C_1_profile`
    }
  },
  authorityDomain: `${Vue.prototype.$sw5eauthdomain}.b2clogin.com`,
  scopes: [
    `https://${Vue.prototype.$sw5eauthdomain}.onmicrosoft.com/api/api.readCharacterData`,
    `https://${Vue.prototype.$sw5eauthdomain}.onmicrosoft.com/api/api.writeCharacterData`,
    'offline_access'
  ]
}

Vue.prototype.$msal = new msalBrowser.PublicClientApplication(Vue.prototype.$msalConfig)
Vue.prototype.$msal.handleRedirectPromise().then(async (tokenResponse: any) => {
  if (tokenResponse && tokenResponse.accessToken) {
    await store.dispatch('authentication/setAccessToken', tokenResponse.accessToken, { root: true })
    if (tokenResponse.idTokenClaims && (tokenResponse.idTokenClaims as any).newUser) {
      router.push('/profile')
    }
  }
}).catch(async (error: any) => {
  if (error && error.errorMessage && error.errorMessage.includes('AADB2C90118')) {
    try {
      Vue.prototype.$msal.loginRedirect(Vue.prototype.$authConfig.authorities.forgotPassword)
    } catch (err) {
      console.error(err)
    }
  } else {
    console.error('Token failure: ' + JSON.stringify(error))
  }
})
Vue.prototype.$msal.addEventCallback(async (message: msalBrowser.EventMessage) => {
  if (message.eventType === msalBrowser.EventType.LOGOUT_START) {
    await store.dispatch('authentication/setIsAuthLoading', true, { root: true })
  }
  if (message.eventType === msalBrowser.EventType.LOGIN_START) {
    await store.dispatch('authentication/setIsAuthLoading', true, { root: true })
  }
  if (message.eventType === msalBrowser.EventType.HANDLE_REDIRECT_END) {
    await store.dispatch('authentication/setIsAuthLoading', false, { root: true })
  }
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
    ? to.meta.title + Vue.prototype.$titleSuffix
    : 'SW5E'
  await (store as any).restored
  next()
})

router.afterEach(async (to, from) => {
  if (to.hash === '#logged-out') {
    router.push(to.path)
    await store.dispatch('authentication/setIsAuthLoading', false, { root: true })
  }
})

Vue.use(VueAppInsights, {
  id: 'b5b30062-61c2-4ad6-9c52-277f91a16734',
  router
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
