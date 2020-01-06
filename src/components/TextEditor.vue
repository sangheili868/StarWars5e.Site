<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import VueMarkdown from 'vue-markdown'

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class TextEditor extends Vue {
    @Prop(String) readonly label!: string
    @Prop(String) readonly placeholder!: string
    @Prop(String) readonly value!: string
    @Prop(Boolean) readonly isEditing!: boolean
    @Prop(Boolean) readonly hasOwnState!: boolean
    @Prop(Function) readonly validate!: undefined | ((value: string) => Boolean)

    workingValue = this.value
    isEditingStateful = false

    get isActuallyEditing () {
      return this.isEditing || (this.hasOwnState && this.isEditingStateful)
    }

    get isInvalid () {
      return this.validate && !this.validate(this.workingValue)
    }

    get source () {
      return this.label ? `**${this.label}:** ${this.value}` : this.value
    }

    handleOpen () {
      this.isEditingStateful = true
      this.workingValue = this.value
    }

    handleEdit (event: MouseEvent) {
      this.$emit('input', this.workingValue)
      this.$emit('close', event)
      this.isEditingStateful = false
    }

    handleClose (event: MouseEvent) {
      this.workingValue = this.value
      this.$emit('close', event)
      this.isEditingStateful = false
    }
  }
</script>

<template lang="pug">
  div(v-if="!isActuallyEditing").text-wrap
    div.d-flex.justify-space-between
      div.d-flex
        VueMarkdown(v-if="source", :source="source").textEditorMarkdown
        span(v-else).grey--text {{ placeholder}}
      v-btn(v-if="hasOwnState", icon, @click="handleOpen")
        v-icon fa-edit
  div(v-else).d-flex.justify-space-between.align-center
    v-textarea(outlined, autofocus, hide-details, v-bind="{ label, placeholder }", v-model="workingValue").my-2
    div.d-flex.flex-column
      v-btn(icon, color="primary", :disabled="isInvalid", @click="handleEdit")
        v-icon fa-check
      v-btn(icon, @click="handleClose")
        v-icon fa-times
</template>

<style lang="scss">
  .textEditorMarkdown p {
    margin-bottom: 0;
  }
</style>
