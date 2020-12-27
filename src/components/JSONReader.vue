<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { isEmpty } from 'lodash'

  @Component({
    components: {
      MyDialog
    }
  })
  export default class JSONReader extends Vue {
    @Prop(Boolean) readonly value!: Boolean

    fileReader = new FileReader()

    filename = ''
    characterText = ''
    isEmpty = isEmpty
    myFile: File | [] = []

    created () {
      this.fileReader.onload = (e: Event) => {
        this.characterText = this.fileReader.result as string
      }
    }

    get character () {
      try {
        return JSON.parse(this.characterText)
      } catch (e) {
        return {}
      }
    }

    get hasNoCharacter () {
      return isEmpty(this.character)
    }

    handleUpload (newFile: File) {
      if (newFile) {
        this.filename = newFile.name
        this.fileReader.readAsText(newFile)
      } else this.resetValues()
    }

    handleLoad () {
      this.$emit('import', this.character, this.filename)
      this.$emit('input', false)
    }

    @Watch('value')
    resetValues () {
      this.characterText = ''
      this.filename = ''
    }
  }
</script>

<template lang="pug">
  MyDialog(v-bind="{ value }", @input="input => $emit('input', input)")
    template(#title) Import Character
    template(#text)
      v-file-input(
        v-model="myFile"
        label="Load Character From File"
        accept=".json",
        filled,
        hide-details,
        prepend-icon="",
        :class="$style.reader",
        @change="handleUpload"
      ).mt-3
      v-textarea(
        v-model="characterText",
        filled,
        :clearable="!myFile || Array.isArray(myFile)",
        dense,
        hide-details,
        label="Paste Character Text"
      ).mt-3
    template(#actions)
      v-btn(color="primary", :disabled="hasNoCharacter", @click="handleLoad") Load {{ character && character.name }}
      v-spacer
      v-btn(color="primary", text, @click="$emit('input', false)") Cancel
</template>

<style module lang="scss">
  .reader {
    max-width: 300px !important;
    min-width: 275px !important;
  }
</style>
