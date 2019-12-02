<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from './MyDialog.vue'

  @Component({
    components: {
      MyDialog
    }
  })
  export default class ConfirmDelete extends Vue {
    @Prop(String) readonly label!: string
    @Prop(String) readonly item!: string

    isOpen = false

    handleDelete () {
      this.$emit('delete')
      this.isOpen = false
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(icon, v-on="on").right
        v-icon fa-trash
    template(#title) Delete {{ label }}
    template(#text)
      div.mt-3 Are you sure you want to delete {{ item }}?
    template(#actions)
      v-btn(color="primary", @click="handleDelete") Yes, Delete It
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Cancel
</template>
