<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { HitPointsType } from '@/types'

  @Component
  export default class CharacterSheetHealth extends Vue {
    @Prop(Object) readonly hitPoints!: HitPointsType
  }
</script>

<template lang="pug">
    v-progress-circular(
      :value="100 * hitPoints.current / hitPoints.maximum",
      color="red",
      size="90",
      rotate="270"
      width="10"
    )
      h2 {{ hitPoints.current }}
      v-divider(width="70", :class="$style.divider")
      h2 {{ hitPoints.maximum }}
</template>

<style module lang="scss">
  .divider {
    visibility: visible;
  }
</style>
