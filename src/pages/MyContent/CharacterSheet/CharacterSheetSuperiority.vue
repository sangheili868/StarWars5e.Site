<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SuperiorityType } from '@/types'
  import CheckList from '@/components/CheckList.vue'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetCastingPower from './CharacterSheetCastingPower.vue'

  @Component({
    components: {
      CheckList,
      CharacterSheetModifier,
      CharacterSheetCastingPower
    }
  })
  export default class CharacterSheetSuperiority extends Vue {
    @Prop(Object) readonly superiority!: SuperiorityType
  }
</script>

<template lang="pug">
  div
    h3.mt-2 Maneuvers
    CheckList(:current="superiority.currentDice", :maximum="superiority.maxDice", :title="superiority.diceSize + 's'")
    CharacterSheetModifier(:modifier="superiority.maneuverSaveDC", label="Maneuver Save DC", isFlatNumber, small)
    v-expansion-panel
      CharacterSheetCastingPower(
        v-for="maneuver in superiority.maneuvers"
        :key="maneuver.name"
        :power="maneuver"
      )
</template>

<style module lang="scss">

</style>
