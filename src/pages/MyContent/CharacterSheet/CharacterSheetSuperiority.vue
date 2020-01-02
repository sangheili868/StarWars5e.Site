<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SuperiorityType } from '@/types/completeCharacterTypes'
  import CheckList from '@/components/CheckList.vue'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'
  import { TweaksType } from '@/types/rawCharacterTypes'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import { isEmpty } from 'lodash'

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
        title="Number of Superiority Dice"
        :value="superiority.maxDice",
        :tweaks="tweaks",
        tweakPath="superiority.maxDice",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
        h4 {{ superiority.diceSize }}s
    CharacterSheetModifier(
      :value="superiority.maneuverSaveDC",
      label="Maneuver Save DC",
      :tweaks="tweaks",
      tweakPath="superiority.maneuverSaveDC",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    CharacterSheetExpansionFeatures(:features="superiority.maneuvers")
</template>
