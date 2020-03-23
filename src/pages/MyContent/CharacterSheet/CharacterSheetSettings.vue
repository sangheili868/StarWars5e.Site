<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import html2pdf from 'html2pdf.js'

  @Component({
    components: {
      MyDialog
    }
  })
  export default class CharacterSheetSettings extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    isOpen = false

    exportToPDF () {
      html2pdf(document.getElementById('pdf'))
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(block, v-on="on").my-3 Settings
      v-btn(id="print", @click="exportToPDF").d-block.ma-2 Export To PDF
    template(#title) Settings
    template(#text)
      div More to come here soon
      v-btn(color="red", @click="$emit('replaceCharacterProperty', { path: 'tweaks', property: {} })").white--text.ma-2
        | Clear All Tweaks
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
