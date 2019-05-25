<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import VueMarkdown from 'vue-markdown'

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class VueMarkdownModalLinks extends Vue {
    @Prop(String) readonly source!: string

    get linkified () {
      return this.source.replace(/\]\(/g, `](#${this.$route.path}`)
    }
  }
</script>

<template lang="pug">
  VueMarkdown(:source="linkified")
</template>
