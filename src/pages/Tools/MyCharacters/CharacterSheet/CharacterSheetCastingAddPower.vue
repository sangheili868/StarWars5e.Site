<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import MyDialog from '@/components/MyDialog.vue'
  import { PowerType } from '@/types/characterTypes'
  import { chain, range } from 'lodash'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import MySelect from '@/components/MySelect.vue'

  const powersModule = namespace('powers')

  @Component({
    components: {
      CharacterSheetExpansionFeatures,
      MyDialog,
      MySelect
    }
  })
  export default class CharacterSheetCastingAddPower extends Vue {
    @Prop(Boolean) readonly icon!: boolean
    @Prop(Boolean) readonly disabled!: boolean
    @Prop(String) readonly castingType!: 'Tech' | 'Force'
    @Prop(Boolean) readonly isEnforcingForcePrerequisites!: boolean
    @Prop({ default: 9, type: Number }) readonly maxPowerLevel!: number
    @Prop(Array) readonly powersSelected!: string[]
    @Prop({ type: Array, default: () => [] }) readonly allForcePowers!: string[]

    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void

    isOpen = false
    levelFilter = 0
    alignmentFilter: string[] = []
    range = range

    created () {
      this.fetchPowers()
    }

    get filteredPowers () {
      return chain(this.powers)
        .filter(({ level, powerType, name, forceAlignment }: PowerType) =>
          level <= this.maxPowerLevel &&
          (!this.alignmentFilter.length || this.alignmentFilter.includes(forceAlignment)) &&
          powerType === this.castingType
        )
        .sortBy(({ name, prerequisite }) => {
          if (this.powersSelected.includes(name)) return -2
          else if (this.isAlreadyKnown(name)) return -1
          else if (this.isDisabled(name, prerequisite)) return 1
          else return 0
        })
        .groupBy('level')
        .value()
    }

    isAlreadyKnown (powerName: string) {
      return !this.powersSelected.includes(powerName) && this.allForcePowers.includes(powerName)
    }

    isDisabled (powerName: string, prerequisite: string) {
      const hasEnforcablePrerequisite = prerequisite && this.isEnforcingForcePrerequisites
      const isMeetingPrerequisite = !hasEnforcablePrerequisite || this.allForcePowers.some(forcePower => prerequisite === forcePower || prerequisite === forcePower + 's')
      return (this.disabled || !isMeetingPrerequisite || this.isAlreadyKnown(powerName)) && !this.powersSelected.includes(powerName)
    }

    togglePower (powerName: string) {
      const isSelected = this.powersSelected.includes(powerName)
      const powersWithoutNew = this.powersSelected.filter(power => power !== powerName)
      const powersWithNew = this.powersSelected.concat(powerName)
      this.$emit('updatePowers', isSelected ? powersWithoutNew : powersWithNew)
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      div.text-center.mt-2
        v-btn(v-on="on", :icon="icon", @click="levelFilter=0", color="primary")
          v-icon(v-if="icon") fa-plus
          template(v-else) Choose {{ castingType }} Powers
    template(#title) Choose {{ castingType }} Powers
    template(#text)
      MySelect(v-model="levelFilter", :items="range(0, maxPowerLevel + 1)", label="Filter by Level").mt-3
      MySelect(
        v-if="castingType === 'Force'",
        v-model="alignmentFilter",
        :items="['Light', 'Universal', 'Dark']",
        multiple,
        clearable,
        label="Filter by Alignment"
      ).mt-3
      CharacterSheetExpansionFeatures(:features="filteredPowers[levelFilter]", isShowingLevel, @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)").text-left
        template(v-slot="{ feature }")
          div.d-flex.align-center
            v-checkbox(
              :input-value="powersSelected.includes(feature.name)"
              color="primary",
              hide-details,
              :indeterminate="isDisabled(feature.name, feature.prerequisite)",
              :disabled="isDisabled(feature.name, feature.prerequisite)",
              :class="$style.checkbox",
              @click.stop="togglePower(feature.name)"
            )
            div
              h4 {{ feature.name }}
              div(v-if="isAlreadyKnown(feature.name)").text-caption Power already known
              div(v-else-if="feature.prerequisite").text-caption Prerequisite: #[strong {{ feature.prerequisite }}]
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Done
</template>

<style lang="scss" module>
  .checkbox {
    flex: none !important;
    margin-top: 0 !important;
  }
</style>
