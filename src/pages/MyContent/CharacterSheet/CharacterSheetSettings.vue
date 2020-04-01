<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'

  @Component({
    components: {
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
      v-btn(block, v-on="on").my-3 Settings
    template(#title) Settings
    template(#text)
      a(href="/myContent/characters/print")
        v-btn.d-block.ma-2 Print Character Sheet
      v-btn(color="red", @click="$emit('replaceCharacterProperty', { path: 'tweaks', property: {} })").white--text.ma-2
        | Clear All Tweaks
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
