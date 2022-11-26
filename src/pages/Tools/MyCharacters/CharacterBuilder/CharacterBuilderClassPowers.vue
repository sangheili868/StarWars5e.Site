<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType, PowerType, ArchetypeType } from '@/types/characterTypes'
  import { RawClassType, SettingsType } from '@/types/rawCharacterTypes'
  import CharacterSheetExpansionFeatures from '@/pages/Tools/MyCharacters/CharacterSheet/CharacterSheetExpansionFeatures.vue'
  import CharacterSheetCastingAddPower from '@/pages/Tools/MyCharacters/CharacterSheet/CharacterSheetCastingAddPower.vue'
  import { namespace } from 'vuex-class'

  const powersModule = namespace('powers')

  @Component({
    components: {
      CharacterSheetExpansionFeatures,
      CharacterSheetCastingAddPower
    }
  })
  export default class CharacterBuilderClassPowers extends Vue {
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Object) readonly classData!: ClassType
    @Prop(Object) readonly archetypeData: ArchetypeType | undefined
    @Prop(Object) readonly settings!: SettingsType
    @Prop(Array) readonly allForcePowers!: string[]

    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void

    created () {
      this.fetchPowers()
    }

    get powersSelected (): string[] {
      const classPowers = (this.myClass as any)[this.castingType.toLowerCase() + 'Powers'] as string[] || []
      const archetypePowers = (this.isArchetypeCasting && (this.myClass.archetype as any)[this.castingType.toLowerCase() + 'Powers'] as string[]) || []
      return [ ...classPowers, ...archetypePowers ]
    }

    get powersSelectedData () {
      return this.powers.filter(({ level, powerType, name }) => this.powersSelected.includes(name))
    }

    get isArchetypeCasting () {
      return this.archetypeData && this.archetypeData.casterType !== 'None' && this.archetypeData.casterRatio > 0
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

    handleUpdatePowers (newPowers: string[]) {
      this.$emit('updatePowers', { newPowers, type: this.castingType, isArchetype: this.isArchetypeCasting })
    }
  }
</script>

<template lang="pug">
  div(v-if="['Force', 'Tech'].includes(castingType) && numberPowersKnown > 0").mt-4
    h3 {{ castingType }} Powers
    div {{ powersSelected.length }} / {{ numberPowersKnown }} Known
    CharacterSheetExpansionFeatures(:features="powersSelectedData",
      @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)",
      isShowingLevel, :class="$style.powersList").text-left
    CharacterSheetCastingAddPower(
      :disabled="this.powersSelected.length >= this.numberPowersKnown",
      v-bind="{ castingType, maxPowerLevel, powersSelected, allForcePowers }",
      :isEnforcingForcePrerequisites="settings.isEnforcingForcePrerequisites",
      @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)",
      @updatePowers="handleUpdatePowers"
    )
</template>

<style lang="scss" module>
  .powersList {
    max-height: 400px;
    overflow-y: scroll;
  }
</style>
