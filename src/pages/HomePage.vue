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
  div
    h1 Star Wars 5e
</template>
