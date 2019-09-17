<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import addPlus from '@/utilities/addPlus'

  @Component
  export default class CharacterSheetModifier extends Vue {
    @Prop(Number) readonly modifier!: number
    @Prop(Number) readonly value!: number
    @Prop(String) readonly label!: string
    @Prop(Boolean) readonly isFlatNumber!: boolean
    @Prop(Boolean) readonly small!: boolean

    addPlus = addPlus

    get modifierToShow () {
      return this.isFlatNumber ? this.modifier : addPlus(this.modifier)
    }
  }
</script>

<template lang="pug">
  div(:class="[$style.ability, { ['mb-2']: !small } ]")
    div(:class="$style.values").mr-3
      component(:is="small ? 'h5' : 'h2'", :class="{ [$style.small]: small }") {{ modifierToShow }}
      h5 {{ value }}
    div.text-xs-left
      component(:is="small ? 'h4' : 'h3'") {{ label }}
      slot
</template>

<style module lang="scss">
  .ability {
    display: flex;

    .values {
      min-width: 20px;

      .small {
        font-family: 'Russo One', sans-serif;
        text-align: center;
      }
    }
  }
</style>
