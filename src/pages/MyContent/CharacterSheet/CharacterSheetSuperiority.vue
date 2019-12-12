<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SuperiorityType } from '@/types/completeCharacterTypes'
  import CheckList from '@/components/CheckList.vue'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import { isEmpty } from 'lodash'

  @Component({
    components: {
      CheckList,
      CharacterSheetModifier,
      CharacterSheetExpansionFeatures
    }
  })
  export default class CharacterSheetSuperiority extends Vue {
    @Prop(Object) readonly superiority!: SuperiorityType
    isEmpty = isEmpty

    handleUpdateSuperiorityDice (superiorityDiceUsed: number) {
      this.$emit('updateCharacter', { currentStats: { superiorityDiceUsed } })
    }
  }
</script>

<template lang="pug">
  div(v-if="!isEmpty(superiority)")
    h3.mt-2 Maneuvers
    CheckList(
      :current="superiority.currentDice",
      :maximum="superiority.maxDice",
      :title="superiority.diceSize + 's'"
      @changeSelected="handleUpdateSuperiorityDice"
    )
    CharacterSheetModifier(:modifier="superiority.maneuverSaveDC", label="Maneuver Save DC", isFlatNumber, small)
    CharacterSheetExpansionFeatures(:features="superiority.maneuvers")
</template>
