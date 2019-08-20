<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import characterJson from '@/test/senyaComplete'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetAbilities from './CharacterSheetAbilities.vue'
  import CharacterSheetCombat from './CharacterSheetCombat.vue'
  import CharacterSheetCasting from './CharacterSheetCasting.vue'
  import CharacterSheetEquipment from './CharacterSheetEquipment.vue'
  import CharacterSheetDescription from './CharacterSheetDescription.vue'

  @Component({
    components: {
      CharacterSheetTop,
      CharacterSheetAbilities,
      CharacterSheetCombat,
      CharacterSheetCasting,
      CharacterSheetEquipment,
      CharacterSheetDescription
    }
  })
  export default class CharacterSheet extends Vue {
    completeCharacter = characterJson
  }
</script>

<template lang="pug">
  div
    CharacterSheetTop(v-bind="{ completeCharacter }")
    v-container(grid-list-md).pa-0
      v-layout(wrap, justify-center)
        v-flex(sm4 xs12)
          CharacterSheetAbilities(:abilityScores="completeCharacter.abilityScores")
        v-flex(sm4 xs12)
          CharacterSheetCombat(v-bind="completeCharacter", :speed="completeCharacter.speed.base")
        v-flex(sm4 xs12)
          CharacterSheetCasting(v-bind="completeCharacter")
        v-flex(sm4 xs12)
          CharacterSheetEquipment(v-bind="completeCharacter")
        v-flex(sm4 xs12)
          CharacterSheetDescription(v-bind="completeCharacter")
</template>
