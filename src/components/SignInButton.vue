<script lang="ts">
  import { AccountInfo } from '@azure/msal-browser'
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const authenticationModule = namespace('authentication')

  @Component
  export default class SignInButton extends Vue {
    @authenticationModule.Action fetchAccessToken!: () => {}
    @authenticationModule.Action setIsAuthLoading!: (isAuthLoading: boolean) => Promise<any>

    async signIn () {
      if (Vue.prototype.$msal) {
        await this.setIsAuthLoading(true)
        await this.fetchAccessToken()
      }
    }
  }
</script>

<template lang="pug">
  v-btn(color="primary", @click="signIn", v-bind="$attrs") Login
</template>
