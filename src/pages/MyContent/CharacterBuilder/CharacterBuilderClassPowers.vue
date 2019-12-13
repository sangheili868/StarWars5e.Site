<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType, PowerType, ArchetypeType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import CharacterSheetExpansionFeatures from '@/pages/MyContent/CharacterSheet/CharacterSheetExpansionFeatures.vue'
  import MyDialog from '@/components/MyDialog.vue'
  import { namespace } from 'vuex-class'
  import { chain, range } from 'lodash'

  const powersModule = namespace('powers')

  @Component({
    components: {
      CharacterSheetExpansionFeatures,
      MyDialog
    }
  })
  export default class CharacterBuilderClassPowers extends Vue {
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Object) readonly classData!: ClassType
    @Prop(Object) readonly archetypeData: ArchetypeType | undefined

    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void

    isOpen = false
    levelFilter = 0
    range = range

    created () {
      this.fetchPowers()
    }

    get powersSelected () {
      const classPowers = (this.myClass as any)[this.castingType.toLowerCase() + 'Powers'] as string[] || []
      const archetypePowers = (this.isArchetypeCasting && (this.myClass.archetype as any)[this.castingType.toLowerCase() + 'Powers'] as string[]) || []
      return [ ...classPowers, ...archetypePowers ]
    }

    get powersSelectedData () {
      return this.powers.filter(({ level, powerType, name }) => this.powersSelected.includes(name))
    }

    get filteredPowers () {
      return chain(this.powers)
        .filter(({ level, powerType, name }) =>
          level <= this.maxPowerLevel &&
          powerType === this.castingType
        )
        .groupBy('level')
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
    CharacterSheetExpansionFeatures(:features="powersSelectedData", isShowingLevel, :class="$style.powersList").text-left
    MyDialog(v-model="isOpen")
      template(v-slot:activator="{ on }")
        div.text-center.mt-2
          v-btn(v-on="on", @click="levelFilter=0", color="primary") Choose {{ castingType }} Powers
      template(#title) Choose {{ castingType }} Powers
      template(#text)
        v-autocomplete(v-model="levelFilter", :items="range(0, maxPowerLevel + 1)", label="Filter by Level").mt-3
        CharacterSheetExpansionFeatures(:features="filteredPowers[levelFilter]", isShowingLevel).text-left
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
      template(#actions)
        v-spacer
        v-btn(color="primary", text, @click="isOpen=false") Done
</template>

<style lang="scss" module>
  .powersList {
    max-height: 400px;
    overflow-y: scroll;
  }

  .checkbox {
    flex: none !important;
    margin-top: 0 !important;
  }
</style>
