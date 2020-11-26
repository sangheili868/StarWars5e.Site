<script lang="ts">
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import generateID from '@/utilities/generateID'

  const characterModule = namespace('character')

  @Component
  export default class MyCharacters extends Vue {
    @characterModule.State characters!: RawCharacterType[]
    @characterModule.Action fetchCharacters!: () => void
    @characterModule.Action createCharacter!: (localId: string) => Promise<void>

    created () {
      this.fetchCharacters()
    }

    getClassText (character: RawCharacterType): string {
      return character.classes
        .map(({ name, levels, archetype }) => `${name}${archetype ? ` (${archetype.name})` : ''} ${levels}`)
        .join(', ')
    }

    handleCreateCharacter () {
      const localId = 'temp-' + generateID()
      this.createCharacter(localId).then(() => this.$router.push('characters/' + encodeURIComponent(localId)))
    }
  }
</script>

<template lang="pug">
  div
    v-btn(color="primary", fab, x-large, fixed, bottom, right, @click="handleCreateCharacter")
      v-icon fa-plus
    div.d-flex.justify-center.flex-wrap
      v-card(
        v-for="(character, index) in characters",
        :key="index",
        max-width="500",
        :to="'characters/' + encodeURIComponent(character.id)"
      ).d-flex.pa-3.ma-3
        v-img(:src="character.image", contain, max-height="90", max-width="100", min-width="100")
        div.text-left.pa-3
          h1 {{ character.name }}
          h5 {{ character.species.name }} {{ getClassText(character) }}
</template>
