<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SpeciesType } from '@/types/characterTypes'
  import { chain } from 'lodash'
  import CharactersSpeciesDetail from '@/pages/Characters/CharactersSpeciesDetail.vue'
  import CharacterBuilderSpeciesAbilities from './CharacterBuilderSpeciesAbilities.vue'
  import { RawSpeciesType } from '@/types/rawCharacterTypes'

  @Component({
    components: {
      CharactersSpeciesDetail,
      CharacterBuilderSpeciesAbilities
    }
  })
  export default class CharacterBuilderSpecies extends Vue {
    @Prop(Array) readonly species!: SpeciesType[]
    @Prop(Object) readonly currentSpecies!: RawSpeciesType

    get speciesChoices () {
      return chain(this.species)
        .sortBy('contentType')
        .map('name')
        .value()
    }

    get currentSpeciesData () {
      return this.species.find(({ name }) => name === this.currentSpecies.name)
    }

    handleChangeSpecies (newSpecies: string) {
      this.$emit('replaceCharacterProperty', {
        path: 'species',
        property: {
          name: newSpecies,
          abilityScoreImprovementSelectedOption: 0,
          abilityScoreImprovement: {}
        }
      })
    }
  }
</script>

<template lang="pug">
  div
    h1 Choose a Species
    v-autocomplete(
      :value="currentSpecies.name"
      :items="speciesChoices",
      label="Choose a species",
      @change="handleChangeSpecies"
    )
    div(v-if="currentSpecies.name && currentSpeciesData")
      CharactersSpeciesDetail(:speciesName="currentSpecies.name", isHidingBack).mb-5
      CharacterBuilderSpeciesAbilities(
        :abilitiesIncreased="currentSpeciesData.abilitiesIncreased",
        :currentSpecies="currentSpecies",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
</template>
