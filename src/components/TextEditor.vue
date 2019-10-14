<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class TextEditor extends Vue {
    @Prop(String) readonly label!: string
    @Prop(String) readonly value!: string
    @Prop(Boolean) readonly isEditing!: boolean

    workingValue = this.value

    handleEdit (event: MouseEvent) {
      this.$emit('input', this.workingValue)
      this.$emit('close', event)
    }

    handleClose (event: MouseEvent) {
      this.workingValue = this.value
      this.$emit('close', event)
    }
  }
</script>

<template lang="pug">
  div(v-if="!isEditing").text-wrap
    strong.pr-1 {{ label }}:
    span {{ value }}
  div(v-else).d-flex.justify-space-between.align-center
    v-textarea(outlined, autofocus, hide-details, v-bind="{ label }", v-model="workingValue").my-2
    div.d-flex.flex-column
      v-btn(icon, color="primary", @click="handleEdit")
        v-icon fa-check
      v-btn(icon, @click="handleClose")
        v-icon fa-times
</template>
