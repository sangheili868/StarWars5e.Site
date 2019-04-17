<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class MainToolbar extends Vue {

  }
</script>

<template lang="pug">
  v-toolbar(app, clipped-left)
    v-toolbar-title
      v-img(:src="require('@/assets/sw5e-logo.png')", width="100px")
    v-spacer
    v-toolbar-items
      v-btn(flat, color="primary", to="/") Home
      v-btn(flat, color="primary", to="/handbook") Handbook
      v-btn(flat, color="primary", to="/credits") Credits
</template>
