<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SpeciesType } from '@/types/characterTypes.ts'
  import VueMarkdown from 'vue-markdown'
  import Loading from '@/components/Loading.vue'
  import ImageWithLoading from '@/components/ImageWithLoading.vue'
  import { map, chunk } from 'lodash'

  @Component({
    components: {
      VueMarkdown,
      Loading,
      ImageWithLoading
    }
  })
  export default class CharactersSpeciesDetailHalfHuman extends Vue {
    @Prop(Object) readonly speciesData!: SpeciesType

    get tableChunks () {
      const numChunks = ({
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4
      } as { [ breakpoint: string ] : number })[this.$vuetify.breakpoint.name]
      const entriesArray = map(this.speciesData.halfHumanTableEntries, (trait, species) => ({ trait, species }))
      const chunkSize = Math.ceil(entriesArray.length / numChunks)
      return chunk(entriesArray, chunkSize)
    }

    get correctedText () {
      return this.speciesData.flavorText.replace('Half-Human table above', 'Half-Human table below')
    }
  }
</script>

<template lang="pug">
  div( v-if="speciesData").text-left
    h2 Half-Human
    VueMarkdown(:source="correctedText")
    h3 {{ speciesData.name }} Traits
    p As a {{ speciesData.name }}, you have the following special traits.
    div(v-for="trait in speciesData.traits", :key="trait.name")
      div #[strong #[em {{trait.name}}] ] {{ trait.description }}
    div.block
      h2 Half-Human
      div.d-flex.text-center
        table(v-for="(chunk, index) in tableChunks", :key="index").table.ma-1
          tbody
            tr(
              v-for="({trait, species}) in chunk",
              :key="species"
            )
              td {{ species }}
              td {{ trait }}
  Loading(v-else)
</template>

<style module lang="scss">
  .trait {
    min-width: 250px;
    justify-content: space-around;
    display: flex;
  }
</style>
