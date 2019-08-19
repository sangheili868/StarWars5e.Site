<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import HandbookChapter from './HandbookChapter.vue'

  @Component({
    components: {
      HandbookChapter
    }
  })
  export default class HandbookBackgrounds extends Vue {

  }
</script>

<template lang="pug">
  div
    HandbookChapter(chapter="backgrounds")
      v-btn(to="/characters/backgrounds", color="primary") Backgrounds List
</template>
