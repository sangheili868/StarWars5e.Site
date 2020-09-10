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
  div.text-left(
    @click="editing=true",
  )
    h3 Notes
    TextEditor(
      :label="'Notes'",
      :value="notes",
      :isEditing="editing == true",
      @input="newValue => $emit('updateCharacter', { notes: newValue })",
      @close.stop="this.editing = false"
    )
</template>

<style module lang="scss">
  .topSection {
    display: flex;
    flex-wrap: wrap;

    .bioBlock {
      max-width: 350px;

      .bioTable {
        width: 100%;
        font-size: 12px;
      }
    }
  }
</style>
