<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { startCase } from 'lodash'

  @Component
  export default class BackButton extends Vue {
    get splitRoute () {
      return this.$route.path.split('/')
    }

    get parentRoute () {
      return this.splitRoute.slice(0, this.splitRoute.length - 1).join('/')
    }

    get parentRouteName () {
      const parentPosition = this.splitRoute.length - 2
      return startCase(this.splitRoute.slice(parentPosition, parentPosition + 1)[0])
    }
  }
</script>

<template lang="pug">
  div.text-left
    v-btn(text, :to="parentRoute", exact).secondary--text
      v-icon.mr-2 fa-angle-left
      | {{ parentRouteName }}
</template>
