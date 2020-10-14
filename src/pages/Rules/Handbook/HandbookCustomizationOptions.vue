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
      v-btn(to="/characters/feats", color="primary" target="_blank").mx-2 Feats
      v-btn(to="/characters/fightingStyles", color="primary" target="_blank").mx-2 Fighting Styles
      v-btn(to="/characters/fightingMasteries", color="primary" target="_blank").mx-2 Fighting Masteries
      v-btn(to="/characters/lightsaberForms", color="primary" target="_blank").mx-2 Lightsaber Forms
</template>
