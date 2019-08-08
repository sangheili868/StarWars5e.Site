<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import HandbookChapter from './HandbookChapter.vue'

  @Component({
    components: {
      HandbookChapter
    }
  })
  export default class HandbookCustomizationOptions extends Vue {

  }
</script>

<template lang="pug">
  div
    HandbookChapter(chapter="customization")
      v-btn(to="/characters/feats", color="primary") Feats List
</template>
