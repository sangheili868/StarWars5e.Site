<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'
  import axios from 'axios'
  import { AuthType } from '../types'
  import Cookies from 'js-cookie'

  const authModule = namespace('auth')

  @Component({
    components: {
      Loading
    }
  })
  export default class LoginPage extends Vue {
    @authModule.Action storeAuth!: (auth: AuthType) => void

    async auth (provider: string) {
      // this.$auth.logout()
      try {
        var response = await Vue.prototype.$auth.authenticate(provider)
        await this.storeAuth(response.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<template lang="pug">
  div
    v-btn(@click="auth('google')") google
    v-btn(@click="auth('facebook')") facebook
    v-btn(@click="auth('discord')") discord
</template>
