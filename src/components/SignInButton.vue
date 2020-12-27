<script lang="ts">
  import { PublicClientApplication, AccountInfo, SilentRequest } from '@azure/msal-browser'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { authConfig } from '@/modules/authentication'

  const authenticationModule = namespace('authentication')

  @Component
  export default class SignInButton extends Vue {
    @authenticationModule.Getter account!: AccountInfo
    @authenticationModule.Action initMSAL!: () => {}
    @authenticationModule.Action fetchAccessToken!: () => {}

    created () {
      this.initMSAL()
    }

    async signIn () {
      if (Vue.prototype.$msal) {
        this.$emit('setAuthLoading', true)
        await this.fetchAccessToken()
        this.$emit('setAuthLoading', false)
      }
    }
  }
</script>

<template lang="pug">
  v-btn(color="primary", @click="signIn", v-bind="$attrs") Login
</template>
