<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import StarshipChapter from './StarshipChapter.vue'
  import ReferenceVentures from '@/pages/Reference/ReferenceVentures.vue'

  @Component({
    components: {
      StarshipChapter,
      ReferenceVentures
    }
  })
  export default class StarshipVentures extends Vue {

  }
</script>

<template lang="pug">
  div
    StarshipChapter(chapter='customization')
      ReferenceVentures
</template>
