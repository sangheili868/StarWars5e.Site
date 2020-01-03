<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import addPlus from '@/utilities/addPlus'
  import ordinal from 'ordinal'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'

  @Component({
    components: {
      CharacterSheetTweaker
    }
  })
  export default class CharacterSheetModifier extends Vue {
    @Prop(Number) readonly value!: number
    @Prop(String) readonly label!: string
    @Prop(String) readonly title!: string
    @Prop(Boolean) readonly addPlus!: boolean
    @Prop(Boolean) readonly ordinal!: boolean
    @Prop(String) readonly tweakPath!: string

    get valueToShow (): string {
      if (this.addPlus) return addPlus(this.value)
      else if (this.ordinal) return ordinal(this.value)
      else return this.value.toString()
    }
  }
</script>

<template lang="pug">
  CharacterSheetTweaker(
    :title="title || label",
    :tweakPaths="[{ name: title || label, path: tweakPath }]",
    @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
  )
    div.d-flex.align-center
      h5(:class="$style.value").mr-1.text-center {{ valueToShow }}
      h4 {{ label }}
    div.d-flex.align-center
      div(:class="$style.value").mr-1
      slot
</template>

<style module lang="scss">
  .value {
    min-width: 25px;
    font-family: 'Russo One', sans-serif;
  }
</style>
