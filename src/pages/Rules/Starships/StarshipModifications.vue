<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import StarshipChapter from './StarshipChapter.vue'
  import ReferenceStarshipModifications from '@/pages/Reference/ReferenceStarshipModifications.vue'

  @Component({
    components: {
      StarshipChapter,
      ReferenceStarshipModifications
    }
  })
  export default class StarshipModifications extends Vue {

  }
</script>

<template lang="pug">
  div
    StarshipChapter(chapter='modifications')
      ReferenceStarshipModifications
</template>
