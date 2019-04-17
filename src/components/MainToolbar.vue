<template lang="pug">
  v-toolbar
    v-toolbar-title
      v-img(:src="require('@/assets/sw5e-logo.png')", width="100px")
    v-spacer
    v-toolbar-items
      v-btn(flat, to="/") Home
      v-btn(flat, to="/credits") Credits
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class MainToolbar extends Vue {

  }
</script>

<style lang="scss">

</style>
