<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class LinkModal extends Vue {
    @Prop(String) readonly title!: string
    @Prop(String) readonly link!: string
    isOpen = false

    get isDark () {
      return this.$vuetify.theme.dark
    }
  }
</script>

<template lang="pug">
  v-dialog(v-model="isOpen", width="500")
    template(v-slot:activator="{ on }")
      a(v-on="on") {{ link }}
    v-card
      v-card-title(
        v-if="title",
        :class="{ ['darken-1']: isDark, ['lighten-2']: !isDark }",
        primary-title
      ).headline.grey.primary--text {{ title }}
      v-card-text.black--text.pt-3
        slot
      v-divider
      v-card-actions
        v-spacer
        v-btn(color="primary", text, @click="isOpen = false") Close
</template>
