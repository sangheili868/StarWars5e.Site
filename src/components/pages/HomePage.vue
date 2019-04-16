<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { State, Action } from 'vuex-class'

  @Component
  export default class HomePage extends Vue {
    @State classes!: []
    @Action fetchClasses!: () => void

    get classList () {
      return this.classes.map(({ name }) => name).join(', ')
    }

    created () {
      this.fetchClasses()
    }
  }
</script>

<template lang="pug">
  div(:class="$style.hello")
    h1 Star Wars
    h2 {{ this.classList }}
</template>

<style module lang="scss">
  .hello {
    color: #42b983;
  }
</style>
