<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdown from 'vue-markdown'

  const speciesModule = namespace('species')
  const handbookBlobsModule = namespace('handbookBlobs')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class HandbookSpecies extends Vue {
    @speciesModule.State species!: string[]
    @speciesModule.Action fetchSpecies!: () => void
    @handbookBlobsModule.State handbookBlobs!: { [key: string]: string }
    @handbookBlobsModule.Action fetchHandbookBlob!: (chapter: string) => void

    created () {
      this.fetchSpecies()
      this.fetchHandbookBlob('Species')
    }

    get blob () {
      return this.handbookBlobs['Species']
    }
  }
</script>

<template lang="pug">
  div
    VueMarkdown(:source="blob").text-xs-left
    v-container(grid-list-lg, fluid)
      v-layout(row, wrap, justify-center)
        v-flex(v-for="species in this.species", :key="species.name", d-flex).xs12.sm6.md4
          v-card(:to="`species/${species.name}`", hover, exact).ma-2
            v-card-text(primary-title)
              h3 {{ species.name }}
              div.text-xs-left
                p {{ species.distinctions }}
</template>
