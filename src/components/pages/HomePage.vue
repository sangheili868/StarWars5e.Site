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

<template>
  <div class="hello">
    <h1>Star Wars</h1>
    <h2>{{ this.classList }}</h2>
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
