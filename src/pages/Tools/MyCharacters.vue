<script lang="ts">
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import generateID from '@/utilities/generateID'
  import JSONReader from '@/components/JSONReader.vue'

  const characterModule = namespace('character')

  @Component({
    components: {
      JSONReader
    }
  })
  export default class MyCharacters extends Vue {
    @characterModule.State characters!: RawCharacterType[]
    @characterModule.Action fetchCharacters!: () => void
    @characterModule.Action createCharacter!: (localId: string) => Promise<void>

    searchText = ''
    isFabOpen = false
    isImportOpen = false

    created () {
      this.fetchCharacters()
    }

    get filteredCharacters () {
      return this.characters.filter(({ name }) => (name.toLowerCase() || 'unnamed character').includes(this.searchText.toLowerCase()))
    }

    getClassText (character: RawCharacterType): string {
      return character.species.name || character.classes.length
        ? character.species.name + ' ' + character.classes
          .map(({ name, levels, archetype }) => `${name}${archetype && character.classes.length < 3 ? ` (${archetype.name})` : ''} ${levels}`)
          .join(', ')
        : 'No species or classes chosen.'
    }

    handleCreateCharacter () {
      const localId = 'temp-' + generateID()
      this.createCharacter(localId).then(() => this.$router.push('mycharacters/' + encodeURIComponent(localId)))
    }

    handleCharacterUpload () {

    }
  }
</script>

<template lang="pug">
  div
    JSONReader(v-model="isImportOpen" @import="handleCharacterUpload")
    v-speed-dial(v-model="isFabOpen", fixed, bottom, right, open-on-hover)
      template(#activator)
        v-btn(v-model="isFabOpen", color="primary", fab, x-large)
          v-icon(v-if="!isFabOpen") fa-plus
          v-icon(v-else) fa-times
      v-btn(color="secondary", fab, @click="handleCreateCharacter")
        v-icon fa-plus
      v-btn(color="secondary", fab, @click="isImportOpen=true")
        v-icon fa-download
    h1.mb-5.text-h1 My Characters
    div(v-if="characters.length > 4").d-flex.justify-center.align-center
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
      div(v-if="!characters.length").ma-3 Create a new character by hovering the
        v-btn(color="primary", fab, x-small).ma-2
            v-icon fa-plus
        | button below, and then clicking
        v-btn(color="secondary", fab, x-small).ma-2
            v-icon fa-plus
      div(v-if="characters.length && !filteredCharacters.length").ma-3 No characters found with filter.
      v-card(
        v-for="(character, index) in filteredCharacters",
        :key="index",
        width="400",
        height="130",
        hover
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
        div(:class="$style.characterText").text-left.pa-3
          h1 {{ character.name || 'Unnamed Character' }}
          h5.primary--text {{ getClassText(character) }}
</template>

<style lang="scss" module>
  .searchBox {
    max-width: 600px !important;
  }

  .characterText {
    overflow: hidden;
  }
</style>
