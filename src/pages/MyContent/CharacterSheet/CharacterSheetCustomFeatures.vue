<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Draggable from 'vuedraggable'
  import MyDialog from '@/components/MyDialog.vue'
  import TextEditor from '@/components/TextEditor.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'

  @Component({
    components: {
      Draggable,
      MyDialog,
      TextEditor,
      ConfirmDelete
    get draggableFeatures () {
      return this.features
    }

    set draggableFeatures (customFeatures) {
      this.$emit('updateCharacter', { customFeatures })
    }
    }
  })
  export default class CharacterSheetCustomFeatures extends Vue {
    @Prop(Array) readonly features!: { name: string, content: string }[]
    isOpen = false
    name = ''
    content = ''

    resetValues () {
      this.name = ''
      this.content = ''
    }

    addItem () {
      this.$emit('updateCharacter', { customFeatures: { [this.features.length]: {
        name: this.name,
        content: this.content
      } } })
      this.isOpen = false
    }

    handleEdit (field: string, newValue: string, index: number) {
      this.$emit('updateCharacter', { customFeatures: { [index]: { [field]: newValue } } })
    }

    isEmptyString (input: string) {
      return input.length > 0
    }
  }
</script>

<template lang="pug">
  div
    h3.mt-2.d-flex.justify-space-between.align-end Custom Features
      MyDialog(v-model="isOpen")
        template(v-slot:activator="{ on }")
          v-btn(v-on="on", icon, @click="resetValues", color="primary")
            v-icon fa-plus
        template(#title) Add Feature
        template(#text)
          v-text-field(outlined, autofocus, hide-details, label="Name", v-model="name").my-2
          v-textarea(outlined, autofocus, hide-details, label="Feature Text", v-model="content").my-2
        template(#actions)
          v-btn(color="primary", :disabled="!name", @click="addItem") Add
          v-spacer
          v-btn(color="primary", text, @click="isOpen=false") Close
    v-expansion-panels(accordion, multiple)
      Draggable(v-model="draggableFeatures").flex-grow-1
        v-expansion-panel(v-for="({ name, content }, index) in features", :key="index").featurePanel
          v-expansion-panel-header.pa-2
            h4 {{ name }}
          v-expansion-panel-content.ma-2.caption
            TextEditor(
              :value="content",
              hasOwnState,
              placeholder="Feature Text",
              @input="newValue => handleEdit ('content', newValue, index)")
            div.d-flex.justify-end
              ConfirmDelete(
                label="Feature",
                :item="name",
                @delete="$emit('deleteCharacterProperty', { path: 'customFeatures', index })"
              )
</template>

<style module lang="scss">
  .featurePanel .v-expansion-panel-header {
    min-height: 0;
  }
</style>
