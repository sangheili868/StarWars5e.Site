<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import CharacterSheetHealth from './CharacterSheetHealth.vue'
  import CharacterSheetExperience from './CharacterSheetExperience.vue'
  import CharacterSheetConditions from './CharacterSheetConditions.vue'
  import CharacterSheetSettings from './CharacterSheetSettings.vue'

  @Component({
    components: {
      CharacterSheetHealth,
      CharacterSheetExperience,
      CharacterSheetConditions,
      CharacterSheetSettings
    }
  })
  export default class CharacterSheetTop extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType

    get classText () {
      return this.completeCharacter.species + ' ' + this.completeCharacter.classes
        .map(({ name, levels, archetype }) => {
          const archetypeText = archetype ? ` (${archetype})` : ''
          return `${name}${archetypeText} ${levels}`
        })
        .join(', ')
    }
  }
</script>

<template lang="pug">
  v-card.px-3.d-flex.justify-space-around.flex-wrap.align-center
    v-img(:src="completeCharacter.image", contain, max-height="90", max-width="90", min-width="100")
    div.text-left
      h1 {{ completeCharacter.name }}
      h5 {{ classText }}
      CharacterSheetExperience(
        v-bind="{ completeCharacter }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
        @goToStep="step => $emit('goToStep', step)"
      )
    CharacterSheetHealth(
      :hitPoints="completeCharacter.hitPoints",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    div
      CharacterSheetSettings(
        :completeCharacter="completeCharacter",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetConditions(
        :myConditions="completeCharacter.conditions",
        :exhaustion="completeCharacter.exhaustion",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
</template>
