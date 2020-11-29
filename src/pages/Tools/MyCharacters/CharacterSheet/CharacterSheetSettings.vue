<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import CharacterSheetMenuButton from './CharacterSheetMenuButton.vue'

  @Component({
    components: {
      MyDialog,
      CharacterSheetMenuButton
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
      CharacterSheetMenuButton(text="Settings", icon="cog", :on="on")
    template(#title) Character Sheet Settings
    template(#text)
      div.d-flex.flex-column
        v-btn(color="red", @click="$emit('replaceCharacterProperty', { path: 'tweaks', property: {} })").white--text.ma-2
          | Clear All Tweaks
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
