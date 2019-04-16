<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { State, Action } from 'vuex-class'
  import axios from 'axios'
  import _ from 'lodash'

  @Component
  export default class CreditsPage extends Vue {
    @State credits!: string[]
    @Action fetchCredits!: () => void

    get creditsList () {
      return this.credits.join(', ')
    }

    created () {
      this.fetchCredits()
    }
  }
</script>

<template>
  <div class="hello">
    <h1>Star Wars</h1>
    <h2>{{ creditsList }}</h2>
  </div>
</template>

<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
