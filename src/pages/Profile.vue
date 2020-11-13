<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ProfilePage extends Vue {
    async login () {
      await Vue.prototype.$msal.signIn()
    }

    logout () {
      Vue.prototype.$msal.signOut()
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
