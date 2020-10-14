<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import HandbookChapter from './HandbookChapter.vue'
  import CharactersBackgrounds from '@/pages/Characters/CharactersBackgrounds.vue'

  @Component({
    components: {
      HandbookChapter,
      CharactersBackgrounds
    }
  })
  export default class HandbookBackgrounds extends Vue {

  }
</script>

<template lang="pug">
  div
    HandbookChapter(chapter="backgrounds")
      CharactersBackgrounds(isInHandbook)
</template>
