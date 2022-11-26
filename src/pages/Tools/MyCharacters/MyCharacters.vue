<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import generateID from '@/utilities/generateID'
  import JSONReader from '@/components/JSONReader.vue'
  import baseCharacter from '@/modules/CharacterEngine/baseCharacter.json'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import Loading from '@/components/Loading.vue'
  import SignInButton from '@/components/SignInButton.vue'

  const characterModule = namespace('character')
  const authenticationModule = namespace('authentication')

  @Component({
    components: {
      JSONReader,
      SignInButton,
      Loading
    }
  })
  export default class MyCharacters extends Vue {
    @authenticationModule.Getter isLoggedIn!: boolean
    @characterModule.State characters!: RawCharacterType[]
    @characterModule.Action fetchCharacters!: () => Promise<any>
    @characterModule.Action saveCharacter!: (newCharacter: RawCharacterType) => Promise<any>
    @characterModule.Action saveCharacters!: (newCharacters: RawCharacterType[]) => Promise<any>
    @characterModule.Action saveCharacterLocally!: (newCharacter: RawCharacterType) => Promise<any>

    searchText = ''
    isFabOpen = false
    isImportOpen = false
    characterLimit = process.env.VUE_APP_characterLimitPerUser
    isLoadingCharacter = true

    created () {
      this.fetchCharacters().then(() => {
        this.saveCharactersWithoutIds()
        this.isLoadingCharacter = false
      })
    }

    @Watch('isLoggedIn')
    saveTempCharacters () {
      this.fetchCharacters().then(() => {
        this.saveCharactersWithoutIds()
      })
    }

    get isOverCharacterLimit () {
      return this.characters.length >= this.characterLimit
    }

    get filteredCharacters () {
      return this.characters
        .filter(({ name }) => (name && name.toLowerCase() ? name.toLowerCase() : 'unnamed character').includes(this.searchText.toLowerCase()))
        .sort((char1, char2) => char1.changedAt && (char1.changedAt < char2.changedAt) ? 1 : -1)
    }

    saveCharactersWithoutIds () {
      if (this.isLoggedIn) {
        this.saveCharacters(this.characters.filter(({ id }) => !id))
      }
    }

    getClassText (character: RawCharacterType): string {
      const { species, classes } = character
      return species.name || classes.length
        ? species.name + ' ' + classes
          .map(({ name, levels, archetype }) => `${name}${archetype && classes.length < 3 ? ` (${archetype.name})` : ''} ${levels}`)
          .join(', ')
        : 'No species or classes chosen.'
    }

    handleCreateCharacter (newCharacter: RawCharacterType | undefined) {
      const localId = 'temp-' + generateID()
      this.isLoadingCharacter = true
      if (newCharacter) {
        // Save a character after importing
        this.saveCharacter({
          ...baseCharacter,
          ...newCharacter,
          createdAt: newCharacter.createdAt ? newCharacter.createdAt : Date.now(),
          localId
        })
          .then(() => this.$router.push('mycharacters/' + encodeURIComponent(localId) + '?isNew=true'))
          .finally(() => { this.isLoadingCharacter = false })
      } else {
        // Don't save a new, empty character
        this.saveCharacterLocally({
          ...baseCharacter,
          featureConfigs: [],
          createdAt: Date.now(),
          localId
        })
          .then(() => this.$router.push('mycharacters/' + encodeURIComponent(localId) + '?isNew=true'))
          .finally(() => { this.isLoadingCharacter = false })
      }
    }
  }
</script>

<template lang="pug">
  div(v-if="!isLoadingCharacter")
    JSONReader(v-model="isImportOpen" @import="handleCreateCharacter")
    div(v-if="isOverCharacterLimit", :class="$style.disabledButton")
      v-tooltip(top)
        template(v-slot:activator="{ on }")
          span(v-on="on")
            v-btn(disabled, fab, x-large)
              v-icon fa-plus
        div 20 Character Limit
    v-speed-dial(v-else, v-model="isFabOpen", fixed, bottom, right)
      template(#activator)
        v-btn(color="primary", fab, x-large)
          v-icon(v-if="!isFabOpen") fa-plus
          v-icon(v-else) fa-times
      v-btn(color="secondary", fab, @click="handleCreateCharacter()")
        v-icon fa-plus
      v-btn(color="secondary", fab, @click="isImportOpen=true")
        v-icon fa-download
    h1.mb-5 My Characters
      span(v-if="characters.length > 14").pl-3 ({{characters.length}} / {{characterLimit}})
    div(v-if="!isLoggedIn && characters.length").mb-3 Your characters have not been saved! Click
      SignInButton.mx-2
      | to create an account or login to an existing account.
    div(v-if="isLoggedIn && characters.length").mb-3
      div Character cloud storage is in #[strong.primary--text beta]!
      div Periodically export your characters to files to ensure that your data is not lost. (Menu > Export to File)
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
        :to="'mycharacters/' + encodeURIComponent(isLoggedIn ? character.id : character.localId)"
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
  Loading(v-else)
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
    z-index: 1;
    background-color: white;
    border-radius: 50%;
  }
</style>
