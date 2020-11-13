<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import CharacterSheetSettingsRoll20 from './CharacterSheetSettingsRoll20.vue'
  import CharacterSheetMenuButton from './CharacterSheetMenuButton.vue'
  import JSONReader from '@/components/JSONReader.vue'
  import JSONWriter from '@/components/JSONWriter.vue'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { camelCase } from 'lodash'

  @Component({
    components: {
      MyDialog,
      CharacterSheetSettingsRoll20,
      CharacterSheetMenuButton,
      JSONWriter,
      JSONReader
    }
  })
  export default class CharacterSheetMenu extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    @Prop(Object) readonly rawCharacter!: RawCharacterType
    isOpen = false

    get filename () {
      return (this.rawCharacter && this.rawCharacter.name) ? camelCase(this.rawCharacter.name) : 'incompleteCharacter'
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      CharacterSheetMenuButton(text="Menu", icon="bars", color="primary", :on="on")
    template(#title) Character Sheet Menu
    template(#text)
      div.d-flex.flex-column
        v-btn(@click="$emit('handleCreateNew')").my-2 Create Character
        JSONReader(label="Load Character From File", @input="(newCharacter, newFilename) => $emit('handleCharacterUpload', newCharacter, newFilename)")
        v-btn(@click="$emit('goToStep', 1)").my-2 Edit Character
        JSONWriter(:jsonData="rawCharacter" v-bind="{ filename }", @save="$emit('setClean')") Save Character
        v-btn(to="/tools/characters/print").my-2 Print Character Sheet
        CharacterSheetSettingsRoll20(v-bind="{ completeCharacter, rawCharacter }")
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
