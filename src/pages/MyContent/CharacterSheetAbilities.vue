<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import { AbilityScoreType } from '@/types'
  import addPlus from '@/utilities/addPlus'
  import { startCase, upperCase } from 'lodash'
  import ProficiencyDots from '@/components/ProficiencyDots.vue'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'

  @Component({
    components: {
      CharacterSheetSection,
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
  CharacterSheetSection
    CharacterSheetModifier(
      v-for="({ value, modifier, savingThrow, skills }, ability) in abilityScores",
      :key="ability",
      v-bind="{ modifier, value }",
      :label="ability"
    )
      div
        ProficiencyDots(:proficiency="savingThrow.proficiency") {{ addPlus(savingThrow.modifier) }} Saving Throw
        ProficiencyDots(
          v-for="{ name, proficiency, modifier } in skills",
          :key="name",
          v-bind="{ proficiency }"
        ) {{ addPlus(modifier) }} {{ name }}
</template>
