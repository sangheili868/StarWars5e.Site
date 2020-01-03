<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'

  @Component({
    components: {
      CharacterSheetTweaker
    }
  })
  export default class CharacterSheetHealthCircle extends Vue {
    @Prop(Number) readonly current!: number
    @Prop(Number) readonly temporary!: number
    @Prop(Number) readonly maximum!: number
  }
</script>

<template lang="pug">
  CharacterSheetTweaker(
    title="Maximum Hit Points"
    :tweakPaths="[{ name: 'Maximum Hit Points', path: 'hitPoints.maximum' }]",
    @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
  )
    v-progress-circular(
      :value="100 * current / maximum",
      color="red",
      :class="[$style.circle, $style.red]"
      size="100",
      rotate="270",
      width="10"
    )
      div(:class="$style.circle")
        h2 {{ current }}
          span(v-if="temporary").caption.text--accent-3.green--text.ml-1 ({{ temporary }})
        v-divider(width="80", :class="$style.divider")
        h2 {{ maximum }}
    v-progress-circular(
      :value="100 * temporary / maximum",
      :color="'green accent-3'",
      :class="$style.circle"
      size="100",
      :rotate="360 * current / maximum - 90",
      width="10"
    )
</template>

<style module lang="scss">
  .divider {
    visibility: visible;
  }

  .circle {
    transform: scaleX(-1);

    &.red {
      position: absolute;
    }
  }
</style>
