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
      v-btn(to="/rules/handbook/casting/forcePowers", color="primary").ma-2 Force Powers List
      v-btn(to="/rules/handbook/casting/techPowers", color="primary").ma-2 Tech Powers List
</template>
