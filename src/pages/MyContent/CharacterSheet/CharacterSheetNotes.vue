<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import VueMarkdown from 'vue-markdown'
  import TextEditor from '@/components/TextEditor.vue'

  @Component({
    components: {
      VueMarkdown,
      TextEditor
    }
  })
  export default class CharacterSheetNotes extends Vue {
    @Prop(String) readonly notes!: string
    editing = false
  }
</script>

<template lang="pug">
  div.text-left
    h3 Notes
    TextEditor(
      :label="''",
      :value="notes",
      @input="newValue => $emit('updateCharacter', { notes: newValue })",
      hasOwnState
      ).pt-1
</template>
