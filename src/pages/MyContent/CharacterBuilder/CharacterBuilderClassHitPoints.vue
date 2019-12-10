<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import { range } from 'lodash'

  @Component
  export default class CharacterBuilderClassHitPoints extends Vue {
    @Prop(Array) readonly classData!: ClassType
    @Prop(Array) readonly myClass!: RawClassType
    @Prop(Boolean) readonly isFixedHitPoints!: boolean
    @Prop(Boolean) readonly isStartingClass!: boolean

    range = range

    get hitPointsMap () {
      return range(1, this.myClass.levels).map((level, index) => {
        const hpIndex = this.isStartingClass ? index - 1 : index
        const max = this.classData.hitPointsAtFirstLevelNumber + 1
        const manualHitPoints = this.myClass.hitPoints[hpIndex]
        const higherLevelHitPoints = this.isFixedHitPoints ? this.classData.hitPointsAtHigherLevelsNumber : manualHitPoints
        const hitPoints = this.isStartingClass ? this.classData.hitPointsAtFirstLevelNumber : higherLevelHitPoints
        return { hpIndex, hitPoints, max }
      })
    }

    levelsRange (isStartingClass: boolean, levels: number) {
      return range(isStartingClass ? 2 : 1, levels + 1)
    }

    handleUpdateHitPoints (newValue: number, classIndex: number, hpIndex: number) {
      this.$emit('updateCharacter', { classes: { [classIndex]: { hitPoints: { [hpIndex]: newValue } } } })
    }
  }
</script>

<template lang="pug">
  div.text-left
    div(v-for="({ hitPoints, hpIndex, max }) in hitPointsMap", :key="name + level").mr-3.d-flex.align-center
      div(v-if="isFixedHitPoints") {{ hitPoints }}
      v-autocomplete(
        v-else,
        :value="hitPoints",
        :items="range(1, max)"
        hide-details,
        outlined,
        :disabled="hpIndex === 1 && isStartingClass",
        :class="$style.hitPoints",
        @change="newValue => handleUpdateHitPoints(newValue, classIndex, hpIndex)"
      ).mb-3
</template>

<style module lang="scss">
  .hitPoints {
    width: 90px !important;
  }
</style>
