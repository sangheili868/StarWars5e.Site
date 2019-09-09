<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import StarshipChapter from './StarshipChapter.vue'
  import StarshipsVentures from '@/pages/Starships/StarshipsVentures.vue'

  @Component({
    components: {
      StarshipChapter,
      StarshipsVentures
    }
  })
  export default class StarshipVentures extends Vue {

  }
</script>

<template lang="pug">
  div
    StarshipChapter(chapter='customization')
      StarshipsVentures(isInBook)
</template>
