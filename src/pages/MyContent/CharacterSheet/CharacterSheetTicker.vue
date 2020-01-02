<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterSheetTicker extends Vue {
    @Prop(Number) readonly current!: number
    @Prop(Number) readonly max!: number
  }
</script>

<template lang="pug">
  div.d-flex.align-center
    v-btn(icon, small, elevation="4" color="primary", :disabled="current <= 0" @click="$emit('changeCount', current - 1)").ma-2
      v-icon fa-minus
    h5(:class="$style.count").title {{ current }} / {{ max }}
    v-btn(icon, small, elevation="4" color="primary", :disabled="current >= max" @click="$emit('changeCount', current + 1)").ma-2
      v-icon fa-plus
</template>

<style module lang="scss">
  .count {
    min-width: 20px;
  }
</style>
