<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import CharacterSheetHealth from './CharacterSheetHealth.vue'
  import CharacterSheetExperience from './CharacterSheetExperience.vue'
  import CharacterSheetConditions from './CharacterSheetConditions.vue'
  import CharacterSheetMenu from './CharacterSheetMenu.vue'
  import CharacterSheetMenuButton from './CharacterSheetMenuButton.vue'

  @Component({
    components: {
      CharacterSheetHealth,
      CharacterSheetExperience,
      CharacterSheetConditions,
      CharacterSheetMenu,
      CharacterSheetMenuButton
    }
  })
  export default class CharacterSheetTop extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    @Prop(Object) readonly rawCharacter!: RawCharacterType
  }
</script>

<template lang="pug">
  v-card.px-3.d-flex.justify-space-around.flex-wrap.align-center
    v-img(:src="completeCharacter.image", contain, max-height="90", max-width="90", min-width="100").my-2
    div.text-left
      h1 {{ completeCharacter.name }}
      h5 {{ completeCharacter.species }} {{ completeCharacter.classText }}
      CharacterSheetExperience(
        v-bind="{ completeCharacter }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
        @goToStep="step => $emit('goToStep', step)"
      )
    CharacterSheetHealth(
      :hitPoints="completeCharacter.hitPoints",
      :tweaks="completeCharacter.tweaks",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    v-card.d-flex.flex-column.align-start.mb-2.mx-3
      CharacterSheetMenuButton(text="Edit Character", icon="edit", @click="$emit('goToStep', 1)")
      CharacterSheetMenu(
        v-bind="{ completeCharacter, rawCharacter }",
        @setClean="$emit('setClean')",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
        @deleteCharacter="$emit('deleteCharacter')"
      )
      CharacterSheetConditions(
        :myConditions="completeCharacter.conditions",
        :exhaustion="completeCharacter.exhaustion",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
        @replaceCharacterProperties="payload => $emit('replaceCharacterProperties', payload)"
      )
</template>
