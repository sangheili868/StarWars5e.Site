<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { saveAs } from 'file-saver'
  import { isEmpty } from 'lodash'

  @Component
  export default class JSONWriter extends Vue {
    @Prop(Object) readonly jsonData!: object
    @Prop(String) readonly filename!: string

    get isDisabled () {
      return isEmpty(this.jsonData) || this.filename === ''
    }

    saveToFile () {
      saveAs(new Blob([JSON.stringify(this.jsonData)], { type: 'text/plain;charset=utf-8;' }), this.filename + '.json')
      setTimeout(() => this.$emit('save'), 1000)
    }
  }
</script>

<template lang="pug">
  v-btn(:disabled="isDisabled", @click="saveToFile")
    slot
</template>
