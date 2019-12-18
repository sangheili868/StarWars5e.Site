<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import { range } from 'lodash'
  import MySelect from '@/components/MySelect.vue'

  @Component({
    components: {
      MySelect
    }
  })
  export default class CharacterBuilderClassHitPoints extends Vue {
    @Prop(Object) readonly classData!: ClassType
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Boolean) readonly isStartingClass!: boolean

    range = range

    get maxValue () {
      return this.classData.hitPointsAtFirstLevelNumber + 1
    }

    get hitPointsMap () {
      return range(1, this.myClass.levels + 1).map(level => {
        const hpIndex = this.isStartingClass ? level - 2 : level - 1
        const hitPoints = hpIndex < 0 ? this.classData.hitPointsAtFirstLevelNumber : this.myClass.hitPoints[hpIndex]
        return { hpIndex, hitPoints }
      })
    }

    handleUpdate (newValue: number, hpIndex: number) {
      this.$emit('updateHitPoints', { newValue, hpIndex })
    }
  }
</script>

<template lang="pug">
  div.text-left.d-flex.align-center.mt-2.flex-wrap
    MySelect(
      v-for="({ hitPoints, hpIndex }, index) in hitPointsMap",
      :key="hpIndex",
      :value="hitPoints",
      :items="range(1, maxValue)"
      hide-details,
      outlined,
      :disabled="hpIndex === -1",
      :class="$style.hitPoints",
      @change="newValue => handleUpdate(newValue, hpIndex)"
    ).mb-3.mr-3
</template>

<style module lang="scss">
  .hitPoints {
    max-width: 90px !important;
  }
</style>
