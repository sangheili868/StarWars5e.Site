<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SignInButton from '@/components/SignInButton.vue'
  import { UserType } from '@/types/userTypes'

  const authenticationModule = namespace('authentication')
  const userModule = namespace('user')

  @Component({
    components: {
      SignInButton
    }
  })
  export default class UserProfile extends Vue {
    @authenticationModule.State accessToken!: string
    @authenticationModule.State isAuthLoading!: boolean
    @authenticationModule.Getter isLoggedIn!: boolean
    @userModule.Action getUser!: () => Promise<any>
    @userModule.Action postUser!: (user: UserType) => Promise<any>
    @userModule.State user!: UserType

    username = ''
    userLoading = true
    userSubmitting = false
    submittedSuccesfully = false

    async created () {
      if (this.isLoggedIn) {
        await this.getUser()
        this.username = this.user.username
      }
      this.userLoading = false
    }

    async updateUser () {
      this.submittedSuccesfully = false
      this.userSubmitting = true

      await this.postUser({ username: this.username })
      this.submittedSuccesfully = true
      this.userSubmitting = false
    }

    usernameFieldUpdated () {
      this.submittedSuccesfully = false
    }
  }
</script>

<template lang="pug">
  div
    v-progress-circular(v-if="isAuthLoading || userLoading", indeterminate, color="primary", size="100").ma-5
    div(v-else)
      div(v-if="isLoggedIn")
        div.mb-5
          h1 Profile
          div.d-flex.flex-wrap.justify-center
            v-text-field(v-model="username", outlined, label="Username", @change="usernameFieldUpdated")
            v-btn(v-if="!userSubmitting" color="primary", @click="updateUser").mx-2.mt-2 Submit
            v-btn(v-if="userSubmitting" color="primary", disabled).mx-2.mt-2
              v-progress-circular(v-if="userSubmitting", indeterminate, color="white", size="10").ma-5
          h3(v-if="submittedSuccesfully") Username updated!
      div(v-else)
        h2 Log in to view your profile
</template>
