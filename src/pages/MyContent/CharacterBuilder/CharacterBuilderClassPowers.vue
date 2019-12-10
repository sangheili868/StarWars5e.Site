<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType, PowerType, ArchetypeType } from '@/types/characterTypes'
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
    @Prop(Object) readonly archetypeData: ArchetypeType | undefined

    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void

    created () {
      this.fetchPowers()
    }

    get powersSelected () {
      const classPowers = (this.myClass as any)[this.castingType.toLowerCase() + 'Powers'] as string[] || []
      const archetypePowers = (this.isArchetypeCasting && (this.myClass.archetype as any)[this.castingType.toLowerCase() + 'Powers'] as string[]) || []
      return [ ...classPowers, ...archetypePowers ]
    }

    get filteredPowers () {
      return chain(this.powers)
        .filter(({ level, powerType }) => level <= this.maxPowerLevel && powerType === this.castingType)
        .sortBy('level')
        .sortBy(({ name }) => !this.powersSelected.includes(name))
        .value()
    }

    get isArchetypeCasting () {
      return this.archetypeData && this.archetypeData.casterType !== 'None'
    }

    get castingType () {
      return this.isArchetypeCasting ? this.archetypeData!.casterType : this.classData.casterType
    }

    get numberPowersKnown () {
      return this.getLevelTableField(this.castingType + ' Powers Known')
    }

    get maxPowerLevel () {
      return this.getLevelTableField('Max Power Level')
    }

    getLevelTableField (field: string) {
      const classField = parseInt(this.classData.levelChanges[this.myClass.levels][field])
      let archetypeField = 0
      if (this.isArchetypeCasting) {
        const leveledTable = this.archetypeData!.leveledTable
        if (leveledTable) {
          const powersKnownKeyValue = leveledTable[this.myClass.levels].find(({ key }) => key === field)
          archetypeField = powersKnownKeyValue ? parseInt(powersKnownKeyValue.value) : 0
        }
      }
      archetypeField = isNaN(archetypeField) ? 0 : archetypeField
      return isNaN(classField) ? archetypeField : classField
    }

    isDisabled (powerName: string) {
      return !this.powersSelected.includes(powerName) && this.powersSelected.length >= this.numberPowersKnown
    }

    togglePower (powerName: string) {
      const isSelected = this.powersSelected.includes(powerName)
      const powersWithoutNew = this.powersSelected.filter(power => power !== powerName)
      const powersWithNew = this.powersSelected.concat(powerName)
      this.$emit('updatePowers', {
        newPowers: isSelected ? powersWithoutNew : powersWithNew,
        type: this.castingType,
        isArchetype: this.isArchetypeCasting
      })
    }
  }
</script>

<template lang="pug">
  div(v-if="['Force', 'Tech'].includes(castingType) && numberPowersKnown > 0").mt-4
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
