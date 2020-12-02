<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import generateID from '@/utilities/generateID'
  import JSONReader from '@/components/JSONReader.vue'
  import baseCharacter from '@/modules/CharacterEngine/baseCharacter.json'
  import { RawCharacterType } from '@/types/rawCharacterTypes'

  const characterModule = namespace('character')

  @Component({
    components: {
      JSONReader
    }
  })
  export default class MyCharacters extends Vue {
    @characterModule.State characters!: RawCharacterType[]
    @characterModule.Action fetchCharacters!: () => void
    @characterModule.Action saveCharacter!: (newCharacter: RawCharacterType) => Promise<any>

    searchText = ''
    isFabOpen = false
    isImportOpen = false
    characterLimit = 20

    created () {
      this.fetchCharacters()
    }

    get isOverCharacterLimit () {
      return this.characters.length >= this.characterLimit
    }

    get filteredCharacters () {
      return this.characters
        .filter(({ name }) => (name.toLowerCase() || 'unnamed character').includes(this.searchText.toLowerCase()))
        .sort((char1, char2) => char1.name && (char1.name < char2.name) ? -1 : 1)
    }

    getClassText (character: RawCharacterType): string {
      const { species, classes } = character
      return species.name || classes.length
        ? species.name + ' ' + classes
          .map(({ name, levels, archetype }) => `${name}${archetype && classes.length < 3 ? ` (${archetype.name})` : ''} ${levels}`)
          .join(', ')
        : 'No species or classes chosen.'
    }

    handleCreateCharacter (newCharacter: RawCharacterType) {
      const localId = 'temp-' + generateID()
      this.saveCharacter({
        ...baseCharacter,
        ...newCharacter,
        localId
      }).then(() => this.$router.push('mycharacters/' + encodeURIComponent(localId)))
    }
  }
</script>

<template lang="pug">
  div
    JSONReader(v-model="isImportOpen" @import="handleCreateCharacter")
    div(v-if="isOverCharacterLimit", :class="$style.disabledButton")
      v-tooltip(top)
        template(v-slot:activator="{ on }")
          span(v-on="on")
            v-btn(disabled, fab, x-large)
              v-icon fa-plus
        div Over Character Limit
    v-speed-dial(v-else, v-model="isFabOpen", fixed, bottom, right)
      template(#activator)
        v-btn(color="primary", fab, x-large)
          v-icon(v-if="!isFabOpen") fa-plus
          v-icon(v-else) fa-times
      v-btn(color="secondary", fab, @click="handleCreateCharacter()")
        v-icon fa-plus
      v-btn(color="secondary", fab, @click="isImportOpen=true")
        v-icon fa-download
    h1.mb-5.text-h1 My Characters
      span(v-if="characters.length > 14").pl-3 ({{characters.length}} / {{characterLimit}})
    div(v-if="characters.length > 5").d-flex.justify-center.align-center.mb-5
      v-text-field(
        label="Search",
        v-model="searchText",
        append-icon="fa-search",
        clearable,
        solo,
        hide-details,
        autofocus,
        :class="$style.searchBox",
      ).flex-grow-1
    div.d-flex.justify-center.flex-wrap
      div(v-if="!characters.length").ma-3 Create a new character by clicking the
        v-btn(color="primary", fab, x-small).ma-2
            v-icon fa-plus
        | button below, and then click
        v-btn(color="secondary", fab, x-small).ma-2
            v-icon fa-plus
      div(v-if="characters.length && !filteredCharacters.length").ma-3 No characters found with filter.
      v-card(
        v-for="(character, index) in filteredCharacters",
        :key="index",
        hover,
        :class="$style.characterCard"
        :to="'mycharacters/' + encodeURIComponent(character.id)"
      ).d-flex.pa-3.ma-3.align-start
        v-img(
          v-if="character.image",
          :src="character.image",
          contain,
          max-height="90",
          max-width="100",
          min-width="100"
        ).align-self-center
        div.text-left.pa-3
          h2 {{ character.name || 'Unnamed Character' }}
          h5.primary--text {{ getClassText(character) }}
</template>

<style lang="scss" module>
  .characterCard {
    width: 400px;
    min-height: 130px;
  }

  .searchBox {
    max-width: 600px !important;
  }

  .disabledButton {
    position: fixed;
    bottom: 16px;
    right: 16px;
  }
</style>
