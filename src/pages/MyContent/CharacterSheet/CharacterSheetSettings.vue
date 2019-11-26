<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import CharacterSheetSettingsTweaks from './CharacterSheetSettingsTweaks.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'

  @Component({
    components: {
      CharacterSheetSettingsTweaks,
      MyDialog
    }
  })
  export default class CharacterSheetSettings extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    isOpen = false
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(block, v-on="on").mb-3 Settings
    template(#title) Settings
    template(#text)
      CharacterSheetSettingsTweaks(:tweaks="completeCharacter.tweaks")
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>

<style module lang="scss">

</style>
