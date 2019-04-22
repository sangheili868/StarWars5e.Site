<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import HandbookChapter from './HandbookChapter.vue'

  @Component({
    components: {
      HandbookChapter
    }
  })
  export default class HandbookCasting extends Vue {

  }
</script>

<template lang="pug">
  div
    HandbookChapter(chapter="casting")
    v-btn(to="/reference/forcePowers") Force Powers List
    v-btn(to="/reference/techPowers") Tech Powers List
</template>
