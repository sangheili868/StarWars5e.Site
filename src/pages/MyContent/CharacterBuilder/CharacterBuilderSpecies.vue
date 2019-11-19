<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SpeciesType } from '@/types/characterTypes'
  import { chain } from 'lodash'

  @Component
  export default class CharacterBuilderSpecies extends Vue {
    @Prop(Array) readonly species!: SpeciesType[]

    chosenSpecies = ''

    get speciesChoices () {
      return chain(this.species)
        .sortBy('contentType')
        .map('name')
        .value()
    }

    handleChangeSpecies (newSpecies: string) {
      this.$emit('updateCharacter', { species: { name: newSpecies } })
    }
  }
</script>

<template lang="pug">
  div
    h1 Choose a Species
    v-autocomplete(
      v-model="chosenSpecies",
      :items="speciesChoices",
      label="Choose a species",
      @change="handleChangeSpecies"
    )
    ul.text-left
      li * Ability score improvements
      li * Tool proficiency
      li * Musical Instrument proficiency
      li * Skill proficiency
      li * Weapon proficiency
      li * Language
</template>
