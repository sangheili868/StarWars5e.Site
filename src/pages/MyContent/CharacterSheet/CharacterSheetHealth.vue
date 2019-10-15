<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { HitPointsType } from '@/types/completeCharacterTypes'
  import CharacterSheetRest from './CharacterSheetRest.vue'

  @Component({
    components: {
      CharacterSheetRest
    }
  })
  export default class CharacterSheetHealth extends Vue {
    @Prop(Object) readonly hitPoints!: HitPointsType

    healthMod = 0

    updateHitPoints (multiplier: number) {
      const hitPoints = Math.max(0, Math.min(
        this.hitPoints.maximum,
        this.hitPoints.current + (multiplier * this.healthMod)
      ))
      this.$emit('updateCharacter', { currentStats: { hitPoints } })
      this.healthMod = 0
    }
  }
</script>

<template lang="pug">
  div.d-flex.align-center.mx-3.my-1
    div(:class="$style.controlDiv").d-flex.flex-column.align-center.mx-4
      v-progress-circular(
        :value="100 * hitPoints.current / hitPoints.maximum",
        color="red",
        size="90",
        rotate="270"
        width="10"
      )
        div
          h2 {{ hitPoints.current }}
          v-divider(width="71", :class="$style.divider")
          h2 {{ hitPoints.maximum }}
      CharacterSheetRest(
        v-bind="{ hitPoints }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
      )
    div(:class="$style.controlDiv").d-flex.flex-column.align-center.mr-4
      v-btn(:disabled="!healthMod", color="green accent-3", small, @click="updateHitPoints(1)").white--text Heal
      v-text-field(outlined, single-line, hide-details, type="number", v-model="healthMod").my-2
      v-btn(:disabled="!healthMod", color="red accent-3", small, @click="updateHitPoints(-1)").white--text Damage
</template>

<style module lang="scss">
  .controlDiv {
    max-width: 100px;
  }

  .divider {
    visibility: visible;
  }
</style>
