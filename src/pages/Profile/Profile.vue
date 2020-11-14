<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const authenticationModule = namespace('authentication')
  const uiModule = namespace('ui')

  @Component
  export default class ProfilePage extends Vue {
    @uiModule.State authLoading!: string

    async login () {
      await Vue.prototype.$msal.signIn()
    }

    async logout () {
      await Vue.prototype.$msal.signOut()
    }
  }
</script>

<template lang="pug">
  div
    v-progress-circular(v-if="authLoading", indeterminate, color="primary", size="100").ma-5
    div(v-if="!authLoading")
      v-btn(color="primary", @click="login").mx-2.mt-2 Login
      v-btn(color="primary", @click="logout").mx-2.mt-2 Logout
</template>

<style module lang="scss">
</style>
