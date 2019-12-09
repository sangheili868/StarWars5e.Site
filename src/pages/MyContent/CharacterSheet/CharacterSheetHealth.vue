<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { HitPointsType } from '@/types/completeCharacterTypes'
  import CharacterSheetRest from './CharacterSheetRest.vue'
  import CharacterSheetHealthCircle from './CharacterSheetHealthCircle.vue'

  @Component({
    components: {
      CharacterSheetRest,
      CharacterSheetHealthCircle
    }
  })
  export default class CharacterSheetHealth extends Vue {
    @Prop(Object) readonly hitPoints!: HitPointsType

    healthMod = 0

    addHitPoints () {
      const hitPoints = Math.min(this.hitPoints.maximum, this.hitPoints.current + this.healthMod)
      this.$emit('updateCharacter', { currentStats: { hitPoints } })
      this.healthMod = 0
    }

    subtractHitPoints () {
      const temporaryHitPoints = Math.max(0, this.hitPoints.temporary - this.healthMod)
      const lostHP = Math.max(0, this.hitPoints.current + this.hitPoints.temporary - this.healthMod)
      const hitPoints = temporaryHitPoints > 0 ? this.hitPoints.current : lostHP
      this.$emit('updateCharacter', { currentStats: { hitPoints, temporaryHitPoints } })
      this.healthMod = 0
    }

    addTHP () {
      if (this.healthMod > this.hitPoints.temporary) {
        this.$emit('updateCharacter', { currentStats: { temporaryHitPoints: this.healthMod } })
      }
      this.healthMod = 0
    }
  }
</script>

<template lang="pug">
  div.d-flex.align-center.mx-3.my-1
    div(:class="$style.controlDiv").d-flex.flex-column.align-center.mx-4
      CharacterSheetHealthCircle(v-bind="hitPoints")
      CharacterSheetRest(
        v-bind="{ hitPoints }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
      )
    div(:class="$style.controlDiv").d-flex.flex-column.align-center.mr-4
      div.d-flex
        v-btn(:disabled="!healthMod", color="green accent-3", small, @click="addHitPoints").white--text.mr-2 Heal
        v-btn(:disabled="!healthMod", color="green accent-3", small, @click="addTHP").white--text THP
      v-text-field(outlined, single-line, hide-details, type="number", v-model.number="healthMod").my-2
      v-btn(:disabled="!healthMod", color="red accent-3", small, @click="subtractHitPoints").white--text Damage
</template>

<style module lang="scss">
  .controlDiv {
    max-width: 100px;
  }
</style>
