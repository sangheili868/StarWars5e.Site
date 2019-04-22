<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import HandbookChapter from './HandbookChapter.vue'
  import ReferenceSpecies from '@/pages/Reference/ReferenceSpecies.vue'

  @Component({
    components: {
      HandbookChapter,
      ReferenceSpecies
    }
  })
  export default class HandbookSpecies extends Vue {

  }
</script>

<template lang="pug">
  div
    HandbookChapter(chapter='species')
    ReferenceSpecies(isInHandbook)
</template>
