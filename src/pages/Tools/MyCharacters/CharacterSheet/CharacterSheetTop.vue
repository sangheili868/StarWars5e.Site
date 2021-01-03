<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import CharacterSheetHealth from './CharacterSheetHealth.vue'
  import CharacterSheetExperience from './CharacterSheetExperience.vue'
  import CharacterSheetConditions from './CharacterSheetConditions.vue'
  import CharacterMenu from '../CharacterMenu.vue'
  import CharacterSheetMenuButton from './CharacterSheetMenuButton.vue'
  import MyDialog from '@/components/MyDialog.vue'
  import { CharacterValidationType } from '@/types/utilityTypes'
  import { namespace } from 'vuex-class'
  import { isEmpty, merge } from 'lodash'

  const authenticationModule = namespace('authentication')

  @Component({
    components: {
      CharacterSheetHealth,
      CharacterSheetExperience,
      CharacterSheetConditions,
      CharacterMenu,
      CharacterSheetMenuButton,
      MyDialog
    }
  })
  export default class CharacterSheetTop extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    @Prop(Object) readonly rawCharacter!: RawCharacterType
    @Prop(Object) readonly characterValidation!: CharacterValidationType
    @Prop(Boolean) readonly isDirty!: boolean
    @authenticationModule.Getter isLoggedIn!: boolean
    isMenuOpen = false
    clearedTweaks = {}
    isEmpty = isEmpty

    clearAllTweaks () {
      this.clearedTweaks = this.rawCharacter.tweaks
      this.$emit('replaceCharacterProperty', { path: 'tweaks', property: {} })
      window.alert('All tweaks cleared!')
    }

    undoClearTweaks () {
      this.$emit('replaceCharacterProperty', {
        path: 'tweaks',
        property: merge({}, this.rawCharacter.tweaks, this.clearedTweaks)
      })
      this.clearedTweaks = {}
      window.alert('Tweaks restored!')
    }
  }
</script>

<template lang="pug">
  v-card.px-3.d-flex.justify-space-around.flex-wrap.align-center
    v-img(v-if="completeCharacter.image", :src="completeCharacter.image", contain, max-height="90", max-width="90", min-width="100").my-2
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
      MyDialog(v-model="isMenuOpen")
        template(v-slot:activator="{ on }")
          v-badge(:value="isDirty", color="primary", overlap)
            template(v-slot:badge)
              v-icon.white--text fa-exclamation
            CharacterSheetMenuButton(text="Menu", icon="bars", :on="on")
        template(#title) Character Sheet Menu
        template(#text)
          CharacterMenu(
            v-bind="{ completeCharacter, rawCharacter, characterValidation }",
            @setClean="$emit('setClean')",
            @deleteCharacter="$emit('deleteCharacter')"
          )
            div(v-if="isDirty").primary--text.d-flex.flex-wrap.justify-space-around.mt-2
              div Character has unsaved changes!
              div Login, export to file, or copy text to save
            v-btn(v-if="!isEmpty(rawCharacter.tweaks)", color="red", @click="clearAllTweaks").white--text.mt-2 Clear All Tweaks
            v-btn(v-if="!isEmpty(clearedTweaks)", color="red", @click="undoClearTweaks").white--text.mt-2 Undo Last Clear Tweaks
        template(#actions)
          v-spacer
          v-btn(color="primary", text, @click="isMenuOpen=false") Close
      CharacterSheetConditions(
        :myConditions="completeCharacter.conditions",
        :exhaustion="completeCharacter.exhaustion",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
        @replaceCharacterProperties="payload => $emit('replaceCharacterProperties', payload)"
      )
</template>
