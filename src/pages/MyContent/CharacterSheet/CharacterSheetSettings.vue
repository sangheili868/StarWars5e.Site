<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import CharacterSheetSettingsRoll20 from './CharacterSheetSettingsRoll20.vue'
  import { RawCharacterType } from '@/types/rawCharacterTypes'

  @Component({
    components: {
      MyDialog,
      CharacterSheetSettingsRoll20
    }
  })
  export default class CharacterSheetSettings extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    @Prop(Object) readonly rawCharacter!: RawCharacterType
    isOpen = false
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(block, v-on="on").my-3 Settings
    template(#title) Character Sheet Settings
    template(#text)
      div.d-flex.flex-column
        v-btn(to="/myContent/characters/print").ma-2 Print Character Sheet
        CharacterSheetSettingsRoll20(v-bind="{ completeCharacter, rawCharacter }")
        v-btn(color="red", @click="$emit('replaceCharacterProperty', { path: 'tweaks', property: {} })").white--text.ma-2
          | Clear All Tweaks
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
