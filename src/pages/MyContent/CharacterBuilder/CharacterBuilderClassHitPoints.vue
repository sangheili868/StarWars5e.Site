<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import { range } from 'lodash'

  @Component
  export default class CharacterBuilderClassHitPoints extends Vue {
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly currentClasses!: RawClassType[]
    @Prop(Boolean) readonly isFixedHitPoints!: boolean

    range = range

    get classesWithData () {
      return this.currentClasses.map(currentClass => ({
        ...currentClass,
        ...(this.classes.find(({ name }) => name === currentClass.name) || {})
      }))
    }

    get hitPointsMap () {
      let levelsIterator = 1
      return this.classesWithData.map(myClass => {
        const levels = range(levelsIterator, levelsIterator + myClass.levels).map((level, index) => {
          const hpIndex = levelsIterator === 1 ? index - 1 : index
          const max = myClass.hitPointsAtFirstLevelNumber + 1
          const manualHitPoints = myClass.hitPoints[hpIndex]
          const higherLevelHitPoints = this.isFixedHitPoints ? myClass.hitPointsAtHigherLevelsNumber : manualHitPoints
          const hitPoints = level === 1 ? myClass.hitPointsAtFirstLevelNumber : higherLevelHitPoints
          return { level, hpIndex, hitPoints, max }
        })
        levelsIterator += myClass.levels
        return { name: myClass.name, levels }
      })
    }

    get totalHitPoints () {
      return this.hitPointsMap.reduce(
        (acc, { levels }) => acc + levels.reduce(
          (acc2, { hitPoints }) => acc2 + hitPoints,
          0
        ),
        0
      )
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
    div.d-flex.align-center
      h2.mr-3 Hit Points:
      div.mr-5 {{ totalHitPoints }}
      div.caption (before Con Bonus)
    div.d-flex.align-center
      h5.mr-5 Method:
      v-autocomplete(
        :value="isFixedHitPoints ? 'Fixed' : 'Manual'",
        :items="['Fixed', 'Manual']",
        :class="$style.method"
        @input="newMethod => $emit('updateCharacter', { isFixedHitPoints: newMethod === 'Fixed' })"
      )
    div(v-for="({ name, levels }, classIndex) in hitPointsMap", :key="name").d-flex.flex-wrap.mb-3
      h5.mr-3 {{ name }}
      div(v-for="({ level, hitPoints, hpIndex, max }) in levels", :key="name + level").mr-3.d-flex.align-center
        strong.mr-2 {{ level }}:
        div(v-if="isFixedHitPoints") {{ hitPoints }}
        v-autocomplete(
          v-else,
          :value="hitPoints",
          :items="range(1, max)"
          hide-details,
          outlined,
          :disabled="level === 1",
          :class="$style.hitPoints",
          @change="newValue => handleUpdateHitPoints(newValue, classIndex, hpIndex)"
        ).mb-3
</template>

<style module lang="scss">
  .method {
    max-width: 110px !important;
  }

  .hitPoints {
    width: 90px !important;
  }
</style>
