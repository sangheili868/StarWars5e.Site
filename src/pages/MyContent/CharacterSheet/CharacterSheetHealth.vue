<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { HitPointsType } from '@/types/completeCharacterTypes'
  import CharacterSheetRest from './CharacterSheetRest.vue'
  import CharacterSheetHealthCircle from './CharacterSheetHealthCircle.vue'
  import CheckList from '@/components/CheckList.vue'

  @Component({
    components: {
      CharacterSheetRest,
      CharacterSheetHealthCircle,
      CheckList
    }
  })
  export default class CharacterSheetHealth extends Vue {
    @Prop(Object) readonly hitPoints!: HitPointsType

    healthMod = 0

    addHitPoints () {
      const hitPoints = Math.min(this.hitPoints.maximum, this.hitPoints.current + this.healthMod)
      const hitPointsLost = Math.max(0, this.hitPoints.maximum - hitPoints)
      this.$emit('updateCharacter', { currentStats: { hitPointsLost, deathSaves: { successes: 0, failures: 0 } } })
      this.healthMod = 0
    }

    subtractHitPoints () {
      const temporaryHitPoints = Math.max(0, this.hitPoints.temporary - this.healthMod)
      const resultingHP = this.hitPoints.current + this.hitPoints.temporary - this.healthMod
      const hitPoints = temporaryHitPoints > 0 ? this.hitPoints.current : Math.max(0, resultingHP)
      const failures = (resultingHP * -1 >= this.hitPoints.maximum) ? 3 : this.hitPoints.deathSaves.failures
      const hitPointsLost = Math.max(0, this.hitPoints.maximum - hitPoints)
      this.$emit('updateCharacter', { currentStats: { hitPointsLost, temporaryHitPoints, deathSaves: { failures } } })
      this.healthMod = 0
    }

    addTHP () {
      if (this.healthMod > this.hitPoints.temporary) {
        this.$emit('updateCharacter', { currentStats: { temporaryHitPoints: this.healthMod } })
      }
      this.healthMod = 0
    }

    updateDeathSaves (saveType: string, newValue: number) {
      this.$emit('updateCharacter', { currentStats: { deathSaves: { [saveType]: newValue } } })
    }
  }
</script>

<template lang="pug">
  div.d-flex.align-center.mx-3.my-1
    div(:class="$style.controlDiv").d-flex.flex-column.align-center.mx-4.mt-1
      CharacterSheetHealthCircle(
        v-if="hitPoints.current",
        v-bind="hitPoints",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      div(v-else)
        h3 Death Saves
        div.d-flex
          v-icon(dense) fa-heart
          CheckList(
            :current="hitPoints.deathSaves.successes",
            :maximum="3",
            @changeSelected="newValue => updateDeathSaves('successes', newValue)"
          )
        div.d-flex
          v-icon(dense) fa-skull
          CheckList(
            :current="hitPoints.deathSaves.failures",
            :maximum="3",
            @changeSelected="newValue => updateDeathSaves('failures', newValue)"
          )
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
    max-width: 130px;
  }
</style>
