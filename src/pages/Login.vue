<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class LoginPage extends Vue {
    async login () {
      await Vue.prototype.$msal.signIn()
    }

    logout () {
      Vue.prototype.$msal.signOut()
      Vue.prototype.$msal.accessToken = undefined
    }

    // async getToken () {
    //   var x = Vue.prototype.$msal.getAllAccounts()[0]

    //   var silentTokenRequest = {
    //     account: x,
    //     scopes: this.scopes
    //   }

    //   try {
    //     var tokenData = await Vue.prototype.$msal.acquireTokenSilent(silentTokenRequest)
    //   } catch (tokenError) {
    //     var tokenRequest = {
    //       scopes: silentTokenRequest.scopes
    //     }

    //     try {
    //       tokenData = await Vue.prototype.$msal.acquireTokenRedirect(tokenRequest)
    //     } catch (tokenRedirectError) {
    //       console.log('Problem getting token with redirect flow: ' + tokenRedirectError)
    //     }
    //   }

    //   console.log(JSON.stringify(tokenData))
    // }
  }
</script>

<template lang="pug">
  div
    v-btn(color="primary", @click="login").mx-2.mt-2 Login
    v-btn(color="primary", @click="logout").mx-2.mt-2 Logout
    //- v-btn(color="primary", @click="getToken").mx-2.mt-2 Get Token
</template>

<style module lang="scss">
</style>
