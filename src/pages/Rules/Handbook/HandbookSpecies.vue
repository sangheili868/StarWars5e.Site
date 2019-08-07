<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import HandbookChapter from './HandbookChapter.vue'
  import CharactersSpecies from '@/pages/Characters/CharactersSpecies.vue'

  @Component({
    components: {
      HandbookChapter,
      CharactersSpecies
    }
  })
  export default class HandbookSpecies extends Vue {

  }
</script>

<template lang="pug">
  div
    HandbookChapter(chapter='species')
      CharactersSpecies(isInHandbook)
</template>
