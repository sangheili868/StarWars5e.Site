<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import addPlus from '@/utilities/addPlus'

  @Component
  export default class CharacterSheetModifier extends Vue {
    @Prop(Number) readonly modifier!: number
    @Prop(Number) readonly value!: number
    @Prop(String) readonly label!: string
  }
</script>

<template lang="pug">
  div( :class="$style.ability").mb-2
    div(:class="$style.values").mr-3
      h2 {{ addPlus(modifier) }}
      h5 {{ value }}
    div.text-xs-left
      h3 {{ label }}
      slot

</template>

<style module lang="scss">
  .ability {
    display: flex;

    .values {
      min-width: 20px;
    }
  }
</style>
