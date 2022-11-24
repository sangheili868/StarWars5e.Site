<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SuperiorityType } from '@/types/completeCharacterTypes'
  import CheckList from '@/components/CheckList.vue'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import { isEmpty, filter, startCase } from 'lodash'
  import { TweaksType } from '@/types/rawCharacterTypes'

  @Component({
    components: {
      CheckList,
      CharacterSheetModifier,
      CharacterSheetTweaker,
      CharacterSheetExpansionFeatures
    }
  })
  export default class CharacterSheetSuperiority extends Vue {
    @Prop(Object) readonly superiority!: SuperiorityType
    @Prop(Object) readonly tweaks!: TweaksType

    isEmpty = isEmpty
    startCase = startCase

    get types () {
      const hasPhysicalManeuvers = this.superiority.maneuvers.some(({ type }) => type === 'Physical')
      const hasMentalManeuvers = this.superiority.maneuvers.some(({ type }) => type === 'Mental')
      const hasGeneralManeuvers = this.superiority.maneuvers.some(({ type }) => type === 'General') && (
        (hasPhysicalManeuvers && hasMentalManeuvers) ||
        (!hasPhysicalManeuvers && !hasMentalManeuvers) ||
        (hasPhysicalManeuvers && !hasMentalManeuvers && this.superiority.generalSaveDC > this.superiority.physicalSaveDC) ||
        (hasMentalManeuvers && !hasPhysicalManeuvers && this.superiority.generalSaveDC > this.superiority.mentalSaveDC)
      )
      return filter([hasPhysicalManeuvers && 'physical', hasGeneralManeuvers && 'general', hasMentalManeuvers && 'mental'])
    }

    handleUpdateSuperiorityDice (superiorityDiceUsed: number) {
      this.$emit('updateCharacter', { currentStats: { superiorityDiceUsed } })
    }
  }
</script>

<template lang="pug">
  div
    h3.mt-2 Superiority
    CheckList(
      :current="superiority.currentDice",
      :maximum="superiority.maxDice",
      @changeSelected="handleUpdateSuperiorityDice"
    )
      CharacterSheetTweaker(
        v-bind="{ tweaks }",
        title="Number of Superiority Dice"
        :tweakPaths="[{ name: 'Number of Superiority Dice', path: 'superiority.maxDice' }]",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
        h4 {{ superiority.diceSize }}s

    template(v-if="types.length === 1")
      CharacterSheetModifier(
        :value="superiority[types[0] + 'Modifier']",
        addPlus,
        label="Maneuver Ability Modifier",
        v-bind="{ tweaks }",
        :tweakPath="`superiority.${types[0]}Modifier`",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="superiority[types[0] + 'SaveDC']",
        label="Maneuver Save DC",
        v-bind="{ tweaks }",
        :tweakPath="`superiority.${types[0]}SaveDC`",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
    v-container(v-else-if="types.length > 1")
      v-row(no-gutters)
        v-col(cols="2")
          div
        v-col(cols="6").d-flex.justify-end
          h4 Ability Modifier
        v-col(cols="4").d-flex.justify-center
          h4 Save DC
      v-row(v-if="types.includes('physical')", no-gutters)
        v-col(cols="4")
          h5 Physical
        v-col(cols="4").d-flex.justify-center
          CharacterSheetModifier(
            :value="superiority.physicalModifier",
            addPlus,
            title="Physical Ability Modifier",
            v-bind="{ tweaks }",
            tweakPath="superiority.physicalModifier",
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
          )
        v-col(cols="4").d-flex.justify-center
          CharacterSheetModifier(
            :value="superiority.physicalSaveDC",
            addPlus,
            title="Physical Maneuver Save DC",
            v-bind="{ tweaks }",
            tweakPath="superiority.physicalSaveDC",
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
          )
      v-row(v-if="types.includes('mental')", no-gutters)
        v-col(cols="4")
          h5 Mental
        v-col(cols="4").d-flex.justify-center
          CharacterSheetModifier(
            :value="superiority.mentalModifier",
            addPlus,
            title="Mental Ability Modifier",
            v-bind="{ tweaks }",
            tweakPath="superiority.mentalModifier",
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
          )
        v-col(cols="4").d-flex.justify-center
          CharacterSheetModifier(
            :value="superiority.mentalSaveDC",
            addPlus,
            title="Mental Maneuver Save DC",
            v-bind="{ tweaks }",
            tweakPath="superiority.mentalSaveDC",
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
          )
      v-row(v-if="types.includes('general')", no-gutters)
        v-col(cols="4")
          h5 General
        v-col(cols="4").d-flex.justify-center
          CharacterSheetModifier(
            :value="superiority.generalModifier",
            addPlus,
            title="General Ability Modifier",
            v-bind="{ tweaks }",
            tweakPath="superiority.generalModifier",
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
          )
        v-col(cols="4").d-flex.justify-center
          CharacterSheetModifier(
            :value="superiority.generalSaveDC",
            addPlus,
            title="General Maneuver Save DC",
            v-bind="{ tweaks }",
            tweakPath="superiority.generalSaveDC",
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
          )
    CharacterSheetExpansionFeatures(:features="superiority.maneuvers", @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)")
</template>
