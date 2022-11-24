<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CustomProficiencyType } from '@/types/rawCharacterTypes'
  import { CharacterProficiency, CompletedFeatureType } from '@/types/completeCharacterTypes'
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
    @Prop(Object) readonly backgroundFeature!: CompletedFeatureType | undefined
    @Prop(Array) readonly customLanguages!: string[]
    @Prop(Array) readonly languages!: string[]
    @Prop(Array) readonly proficiencies!: CharacterProficiency[]
    @Prop(Array) readonly skillAndSaveProficiencies!: string[]
    @Prop(Array) readonly customProficiencies!: CustomProficiencyType[]
  }
</script>

<template lang="pug">
  div
    template(v-if="backgroundFeature")
      h3 Background Feature
      CharacterSheetExpansionFeatures(
        :features="[ backgroundFeature ]", @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)",
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
