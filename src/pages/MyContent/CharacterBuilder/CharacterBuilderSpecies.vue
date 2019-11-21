<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SpeciesType } from '@/types/characterTypes'
  import { chain } from 'lodash'
  import CharactersSpeciesDetail from '@/pages/Characters/CharactersSpeciesDetail.vue'
  import { RawSpeciesType } from '@/types/rawCharacterTypes'

  @Component({
    components: {
      CharactersSpeciesDetail
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

    handleChangeSpecies (newSpecies: string) {
      this.$emit('updateCharacter', { species: { name: newSpecies } })
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
    CharactersSpeciesDetail(v-if="currentSpecies.name", :speciesName="currentSpecies.name", isHidingBack)
    h2.text-left.mt-5 TODO:
    ul.text-left
      li Choose Ability score improvements (if available)
      li Choose Tool proficiency (if available)
      li Choose Musical Instrument proficiency (if available)
      li Choose Skill proficiency (if available)
      li Choose Weapon proficiency (if available)
      li Choose Language (if available)
</template>
