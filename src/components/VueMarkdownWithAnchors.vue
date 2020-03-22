<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import VueMarkdown from 'vue-markdown'

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class VueMarkdownWithAnchors extends Vue {
    @Prop(String) readonly source!: string

    jumpToHash () {
      this.$nextTick(() => {
        const element = document.getElementById(this.$route.hash.slice(1))
        if (element) {
          element.scrollIntoView()
          if (window.scrollY > 75) window.scroll(0, window.scrollY - 75)
        }
      })
    }
  }
</script>

<template lang="pug">
  VueMarkdown(:source="source", toc=true, toc-anchor-link-symbol="", @rendered="jumpToHash").overflow-x-auto
</template>
