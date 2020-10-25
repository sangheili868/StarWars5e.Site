<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class LoginPage extends Vue {
    login () {
      try {
        Vue.prototype.$msal.loginRedirect({})
      } catch (err) {
        // handle error
      }
    }

    logout () {
      Vue.prototype.$msal.logout()
    }
  }
</script>

<template lang="pug">
  div
    v-btn(color="primary", @click="login").mx-2.mt-2 Login
    v-btn(color="primary", @click="logout").mx-2.mt-2 Logout
</template>

<style module lang="scss">
</style>
