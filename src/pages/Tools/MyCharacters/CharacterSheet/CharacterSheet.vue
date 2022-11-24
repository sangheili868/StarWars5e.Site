<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { CharacterValidationType } from '@/types/utilityTypes'
  import { range } from 'lodash'
  import { namespace } from 'vuex-class'

  const characterModule = namespace('character')

  @Component({
    components: {
      CharacterSheetTop,
      CharacterSheetSection
    }
  })
  export default class CharacterSheet extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    @Prop(Object) readonly rawCharacter!: RawCharacterType
    @Prop(Object) readonly characterValidation!: CharacterValidationType
    @Prop(Boolean) readonly isDirty!: boolean

    range = range
    openTabs: number[] = [0, 1, 2]

    get numSections () {
      return ({
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3
      } as { [ breakpoint: string ] : number })[this.$vuetify.breakpoint.name]
    }

    goToTab (newTab: number, section: number) {
      Vue.set(this.openTabs, section, newTab)
    }
  }
</script>

<template lang="pug">
  div
    CharacterSheetTop(
      v-if="completeCharacter",
      v-bind="{ completeCharacter, rawCharacter, characterValidation, isDirty }",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)",
      @replaceCharacterProperties="payload => $emit('replaceCharacterProperties', payload)",
      @deleteCharacter="$emit('deleteCharacter')"
      @goToStep="step => $emit('goToStep', step)"
      @setClean="$emit('setClean')"
    ).mt-2
    v-row(v-if="completeCharacter", justify-space-around).nx-2
      v-col(v-for="section in range(numSections)", :key="section", :md="4", :sm="6")
        CharacterSheetSection(
          v-bind="{ completeCharacter }",
          :currentTab="openTabs[section]",
          @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)",
          @goToStep="step => $emit('goToStep', step)"
          @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
          @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)",
          @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)",
          @goToTab="newTab => goToTab(newTab, section)"
        )
</template>
