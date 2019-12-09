<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import MyDialog from '@/components/MyDialog.vue'

  @Component({
    components: {
      ConfirmDelete,
      MyDialog
    }
  })
  export default class CharacterSheetProficienciesLanguages extends Vue {
    @Prop(Array) readonly languages!: string[]
    @Prop(Array) readonly customLanguages!: string[]

    isOpen = false
    newLanguage = ''

    handleAdd () {
      this.$emit('updateCharacter', {
        customLanguages: {
          [this.customLanguages.length]: this.newLanguage
        }
      })
      this.isOpen = false
    }

    handleDelete (index: number) {
      this.$emit('deleteCharacterProperty', { path: 'customLanguages', index })
    }
  }
</script>

<template lang="pug">
  div
    h3.mt-2 Langauges
    div(v-for="language in languages", :key="language").caption {{ language }}
    div(v-for="(language, index) in customLanguages", :key="'language' + index").d-flex.align-center.justify-space-between
      div.caption {{ language }}
      ConfirmDelete(label="Language", :item="language", @delete="handleDelete(index)")
    MyDialog(v-model="isOpen")
      template(v-slot:activator="{ on }")
        div.text-center.mt-2
          v-btn(v-on="on", @click="newLanguage = ''", color="primary") Add Language
      template(#title) Add Language
      template(#text)
        v-text-field(v-model="newLanguage")
      template(#actions)
        v-btn(color="primary", :disabled="!newLanguage", @click="handleAdd") Add
        v-spacer
        v-btn(color="primary", text, @click="isOpen=false") Close
</template>
