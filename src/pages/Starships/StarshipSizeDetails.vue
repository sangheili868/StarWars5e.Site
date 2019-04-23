<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { StarshipSizeType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'

  const starshipSizeModule = namespace('starshipSizes')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class StarshipSizeDetails extends Vue {
    @starshipSizeModule.State starshipSizes!: StarshipSizeType[]
    @starshipSizeModule.Action fetchStarshipSizes!: () => void

    @Prop(String) readonly sizeName!: string

    created () {
      this.fetchStarshipSizes()
    }

    get starshipSizeData () {
      return this.starshipSizes.find(({ name }) => name === this.sizeName)
    }
  }
</script>

<template lang="pug">
  div( v-if="starshipSizeData" ).text-xs-left
    h1 {{ starshipSizeData.name }}
    VueMarkdown(:source="starshipSizeData.fullText")
</template>
