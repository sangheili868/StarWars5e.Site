<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { AbilityScoreType } from '@/types/completeCharacterTypes'
  import addPlus from '@/utilities/addPlus'
  import { startCase, upperCase } from 'lodash'
  import ProficiencyDots from '@/components/ProficiencyDots.vue'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'

  @Component({
    components: {
      CharacterSheetModifier,
      ProficiencyDots
    }
  })
  export default class CharacterSheetAbilities extends Vue {
    @Prop(Object) readonly abilityScores!: AbilityScoreType
    addPlus = addPlus
    startCase = startCase
  }
</script>

<template lang="pug">
  div.d-flex.flex-wrap.mx-n3
    CharacterSheetModifier(
      v-for="({ value, modifier, savingThrow, skills }, ability) in abilityScores",
      :key="ability",
      v-bind="{ modifier, value }",
      :label="ability",
      :class="$style.modifier"
    ).mx-3.flex-grow-1
      div
        ProficiencyDots(:proficiency="savingThrow.proficiency") #[strong {{ addPlus(savingThrow.modifier) }} Saving Throw]
        ProficiencyDots(
          v-for="{ name, proficiency, modifier } in skills",
          :key="name",
          v-bind="{ proficiency }"
        ) {{ addPlus(modifier) }} {{ name }}
</template>

<style module lang="scss">
  .modifier {
    min-width: 183px;
  }
</style>
