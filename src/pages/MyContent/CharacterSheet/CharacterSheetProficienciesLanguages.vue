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
    h3.mt-2.d-flex.justify-space-between.align-end Languages
      MyDialog(v-model="isOpen")
        template(v-slot:activator="{ on }")
          v-btn(v-on="on", icon, @click="newLanguage = ''", color="primary")
            v-icon fa-plus
        template(#title) Add Language
        template(#text)
          v-text-field(v-model="newLanguage")
        template(#actions)
          v-btn(color="primary", :disabled="!newLanguage", @click="handleAdd") Add
          v-spacer
          v-btn(color="primary", text, @click="isOpen=false") Close
    div(v-for="language in languages", :key="language").caption {{ language }}
    div(v-for="(language, index) in customLanguages", :key="'language' + index").d-flex.align-center.justify-space-between
      div.caption {{ language }}
      ConfirmDelete(label="Language", :item="language", @delete="handleDelete(index)")
</template>
