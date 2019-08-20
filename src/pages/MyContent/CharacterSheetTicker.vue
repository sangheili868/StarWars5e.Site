<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterSheetTicker extends Vue {
    @Prop(Number) readonly current!: number
    @Prop(Number) readonly max!: number
  }
</script>

<template lang="pug">
  div(:class="$style.ticker")
    v-btn(icon, small, color="red accent-3").ml-0
      v-icon fa-minus
    h5(:class="$style.count").title {{ current }} / {{ max }}
    v-btn(icon, small, color="green accent-3")
      v-icon fa-plus
    h4
      slot
</template>

<style module lang="scss">
  .ticker {
    display: flex;
    align-items: center;

    .count {
      min-width: 20px;
    }
  }
</style>
