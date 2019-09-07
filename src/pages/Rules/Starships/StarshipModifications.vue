<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import StarshipChapter from './StarshipChapter.vue'
  import StarshipsModifications from '@/pages/Starships/StarshipsModifications.vue'

  @Component({
    components: {
      StarshipChapter,
      StarshipsModifications
    }
  })
  export default class StarshipModifications extends Vue {

  }
</script>

<template lang="pug">
  div
    StarshipChapter(chapter='modifications')
      StarshipsModifications(isInBook)
</template>
