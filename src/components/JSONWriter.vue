<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class JSONWriter extends Vue {

  }
</script>

<template lang="pug">
  v-btn(disabled)
    slot
</template>

<style module lang="scss">

</style>
