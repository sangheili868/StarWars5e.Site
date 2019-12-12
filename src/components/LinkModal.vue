<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'

  @Component({
    components: {
      MyDialog
    }
  })
  export default class LinkModal extends Vue {
    @Prop(String) readonly title!: string
    @Prop(String) readonly link!: string
    isOpen = false
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      a(v-on="on") {{ link }}
    template(#title, v-if="title") {{ title }}
    template(#text)
      div.pt-4
        slot
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen = false") Close
</template>
