<script lang="ts">
  import { PublicClientApplication, AccountInfo, SilentRequest } from '@azure/msal-browser'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { authConfig } from '@/modules/authentication'

  const authenticationModule = namespace('authentication')

  @Component
  export default class SignInButton extends Vue {
    @authenticationModule.Getter account!: AccountInfo
    @authenticationModule.Action initMSAL!: any
    @authenticationModule.Action setAccessToken!: any

    created () {
      this.initMSAL()
    }

    async signIn () {
      if (window.msal) {
        this.$emit('setAuthLoading', true)
        const tokenRequest = { account: this.account, scopes: authConfig.scopes }

        try {
          await window.msal.acquireTokenSilent(tokenRequest).then(tokenResponse => {
            this.setAccessToken(tokenResponse.accessToken)
            this.$emit('setAuthLoading', false)
          })
        } catch (tokenError) {
          try {
            window.msal.acquireTokenRedirect(tokenRequest).then(() => this.$emit('setAuthLoading', false))
          } catch (tokenRedirectError) {
            console.error('Problem getting token with redirect flow: ' + tokenRedirectError)
            this.$emit('setAuthLoading', false)
          }
        }
      }
    }
  }
</script>

<template lang="pug">
  v-btn(color="primary", @click="signIn", v-bind="$attrs") Login
</template>
