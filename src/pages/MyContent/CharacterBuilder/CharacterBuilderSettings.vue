<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterBuilderSettings extends Vue {

  }
</script>

<template lang="pug">
  div
    h1 Character Settings
    ul.text-left
      li Username
      li Fixed or Roll hit points
      li Ability Score Method (Manual, Standard Set, Point Buy)
      li Variant Rules
</template>

<style module lang="scss">

</style>
