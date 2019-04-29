<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import HandbookChapter from './HandbookChapter.vue'

  @Component({
    components: {
      HandbookChapter
    }
  })
  export default class HandbookCustomization extends Vue {

  }
</script>

<template lang="pug">
  div
    HandbookChapter(chapter="customization")
      v-btn(to="/reference/feats", color="primary") Feat List
</template>
