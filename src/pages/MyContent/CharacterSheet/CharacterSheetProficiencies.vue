<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CustomProficiencyType } from '@/types/rawCharacterTypes'
  import { CompletedFeatureType } from '@/types/completeCharacterTypes'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import CharacterSheetProficienciesLanguages from './CharacterSheetProficienciesLanguages.vue'
  import CharacterSheetProficienciesList from './CharacterSheetProficienciesList.vue'

  @Component({
    components: {
      CharacterSheetExpansionFeatures,
      CharacterSheetProficienciesLanguages,
      CharacterSheetProficienciesList
    }
  })
  export default class CharacterSheetProficiencies extends Vue {
    @Prop(Array) readonly nonCombatFeatures!: CompletedFeatureType[]
    @Prop(Array) readonly customLanguages!: string[]
    @Prop(Array) readonly languages!: string[]
    @Prop(Array) readonly proficiencies!: string[]
    @Prop(Array) readonly skillAndSaveProficiencies!: string[]
    @Prop(Array) readonly customProficiencies!: CustomProficiencyType[]
  }
</script>

<template lang="pug">
  div
    h3 Background Feature
    CharacterSheetExpansionFeatures(
      :features="nonCombatFeatures",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
    )
    CharacterSheetProficienciesLanguages(
      v-bind="{ languages, customLanguages }",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
    )
    CharacterSheetProficienciesList(
      v-bind="{ proficiencies, skillAndSaveProficiencies, customProficiencies }",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
    )
</template>
