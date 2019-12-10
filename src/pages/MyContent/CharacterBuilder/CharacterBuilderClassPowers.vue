<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType, PowerType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import CharacterSheetExpansionFeatures from '@/pages/MyContent/CharacterSheet/CharacterSheetExpansionFeatures.vue'
  import { namespace } from 'vuex-class'
  import { chain } from 'lodash'

  const powersModule = namespace('powers')

  @Component({
    components: {
      CharacterSheetExpansionFeatures
    }
  })
  export default class CharacterBuilderClassPowers extends Vue {
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Object) readonly classData!: ClassType

    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void

    created () {
      this.fetchPowers()
    }

    get powersSelected () {
      return (this.myClass as any)[this.castingType.toLowerCase() + 'Powers'] as string[] || []
    }

    get filteredPowers () {
      return chain(this.powers)
        .filter(({ level, powerType }) => level <= this.maxPowerLevel && powerType === this.castingType)
        .sortBy('level')
        .sortBy(({ name }) => !this.powersSelected.includes(name))
        .value()
    }

    get castingType () {
      return this.classData.casterType
    }

    get numberPowersKnown () {
      return parseInt(this.classData.levelChanges[this.myClass.levels][this.castingType + ' Powers Known'])
    }

    get maxPowerLevel () {
      return parseInt(this.classData.levelChanges[this.myClass.levels]['Max Power Level'])
    }

    isDisabled (powerName: string) {
      return !this.powersSelected.includes(powerName) && this.powersSelected.length >= this.numberPowersKnown
    }

    togglePower (powerName: string) {
      const isSelected = this.powersSelected.includes(powerName)
      const powersWithoutNew = this.powersSelected.filter(power => power !== powerName)
      const powersWithNew = this.powersSelected.concat(powerName)
      this.$emit('updatePowers', { newPowers: isSelected ? powersWithoutNew : powersWithNew, type: this.castingType })
    }
  }
</script>

<template lang="pug">
  div(v-if="['Force', 'Tech'].includes(castingType)").mt-4
    h3 {{ castingType }} Powers
    div {{ powersSelected.length }} / {{ numberPowersKnown }} Known
    CharacterSheetExpansionFeatures(:features="filteredPowers", isShowingLevel).text-left
      template(v-slot="{ feature }")
        v-checkbox(
          :input-value="powersSelected.includes(feature.name)"
          color="primary",
          hide-details,
          :indeterminate="isDisabled(feature.name)",
          :disabled="isDisabled(feature.name)",
          :class="$style.checkbox",
          @click.stop="togglePower(feature.name)"
        )
</template>

<style lang="scss" module>
  .checkbox {
    flex: none !important;
    margin-top: 0 !important;
  }
</style>
