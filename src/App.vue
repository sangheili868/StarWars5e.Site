<template lang="pug">
  v-app
    MainToolbar
    v-content
      v-container(fluid)
        router-view
    v-footer(app)
  // div#app
  //   div#nav
  //     img(src="./assets/small-logo.png")
  //     span |
  //     router-link(to="/credits") Credits
  //     router-view
</template>

<script lang="ts">
  import MainToolbar from '@/components/MainToolbar.vue'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    components: {
      MainToolbar
    }
  })
  export default class App extends Vue {

  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
