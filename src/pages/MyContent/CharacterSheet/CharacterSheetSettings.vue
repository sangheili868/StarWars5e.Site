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
      div More to come here soon
      v-btn(color="red", @click="$emit('replaceCharacterProperty', { path: 'tweaks', property: {} })").white--text
        | Clear All Tweaks
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
