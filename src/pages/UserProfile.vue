<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SignInButton from '@/components/SignInButton.vue'
  import { PublicClientApplication } from '@azure/msal-browser'

  const authenticationModule = namespace('authentication')
  const characterModule = namespace('character')

  @Component({
    components: {
      SignInButton
    }
  })
  export default class UserProfile extends Vue {
    @authenticationModule.State accessToken!: string
    @authenticationModule.Action setAccessToken!: (accessToken?: string) => Promise<any>
    @characterModule.Action clearLocalCharacters!: () => Promise<any>

    isAuthLoading = false

    signOut () {
      this.isAuthLoading = true
      Promise.all([
        this.setAccessToken(),
        this.clearLocalCharacters()
      ]).then(() => {
        Vue.prototype.$msal && Vue.prototype.$msal.logout()
      })
    }
  }
</script>

<template lang="pug">
  div
    v-progress-circular(v-if="isAuthLoading", indeterminate, color="primary", size="100").ma-5
    div(v-show="!isAuthLoading")
      SignInButton(v-if="!accessToken", @setAuthLoading="newIsLoading => isAuthLoading = newIsLoading").mx-2.mt-2
      v-btn(v-else, color="primary", @click="signOut").mx-2.mt-2 Logout
</template>
