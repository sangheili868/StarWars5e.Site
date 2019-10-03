<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class JSONReader extends Vue {
    fileReader = new FileReader()
    @Prop(String) readonly label!: string

    created () {
      this.fileReader.onload = (e: Event) => {
        this.$emit('input', JSON.parse(this.fileReader.result as string))
      }
    }

    handleUpload (newFile: File) {
      if (newFile) this.fileReader.readAsText(newFile)
      else this.$emit('input')
    }
  }
</script>

<template lang="pug">
  v-file-input(
    v-bind="{ label }",
    accept=".json",
    filled,
    hide-details,
    prepend-icon="",
    :class="$style.reader",
    @change="handleUpload"
  )
</template>

<style module lang="scss">
  .reader {
    max-width: 300px !important;
  }
</style>
