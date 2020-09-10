<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import TextEditor from '@/components/TextEditor.vue'

  @Component({
    components: {
      TextEditor
    }
  })
  export default class CharacterSheetNotes extends Vue {
    @Prop(String) readonly notes!: string
  }
</script>

<template lang="pug">
  div.text-left
    h3 Notes
    TextEditor(
      :value="notes",
      hasOwnState
      @input="newValue => $emit('updateCharacter', { notes: newValue })",
    ).pt-1
</template>
