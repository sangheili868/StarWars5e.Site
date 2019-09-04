<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SuperiorityType } from '@/types'
  import CharacterSheetTicker from './CharacterSheetTicker.vue'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetCastingPower from './CharacterSheetCastingPower.vue'

  @Component({
    components: {
      CharacterSheetTicker,
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
    h3 Maneuvers
    CharacterSheetTicker(:current="superiority.currentDice", :max="superiority.maxDice") Superiority Dice ({{ superiority.diceSize }})
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
