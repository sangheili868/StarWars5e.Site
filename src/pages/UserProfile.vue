<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SignInButton from '@/components/SignInButton.vue'
  import { PublicClientApplication } from '@azure/msal-browser'

  const authenticationModule = namespace('authentication')
  const uiModule = namespace('ui')

  @Component({
    components: {
      SignInButton
    }
  })
  export default class UserProfile extends Vue {
    @authenticationModule.State accessToken!: string
    @authenticationModule.Action initMSAL!: any

    isAuthLoading = false

    signOut () {
      this.isAuthLoading = true
      Vue.prototype.$msal && Vue.prototype.$msal.logout()
    }
  }
</script>

<template lang="pug">
  div
    v-progress-circular(v-if="isAuthLoading", indeterminate, color="primary", size="100").ma-5
    div(v-show="!isAuthLoading")
      SignInButton(@setAuthLoading="newIsLoading => isAuthLoading = newIsLoading").mx-2.mt-2
      v-btn(color="primary", @click="signOut").mx-2.mt-2 Logout
</template>
