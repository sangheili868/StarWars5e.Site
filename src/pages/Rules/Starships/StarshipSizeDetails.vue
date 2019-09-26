<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { StarshipSizeType } from '@/types/starshipTypes.ts'
  import VueMarkdown from 'vue-markdown'
  import Loading from '@/components/Loading.vue'
  import BackButton from '@/components/BackButton.vue'

  const starshipSizeModule = namespace('starshipSizes')

  @Component({
    components: {
      VueMarkdown,
      BackButton,
      Loading
    }
  })
  export default class StarshipSizeDetails extends Vue {
    @starshipSizeModule.State starshipSizes!: StarshipSizeType[]
    @starshipSizeModule.Action fetchStarshipSizes!: () => void

    @Prop(String) readonly sizeName!: string

    created () {
      this.fetchStarshipSizes()
    }

    get title () {
        return this.sizeName + ' | Starships' + Vue.prototype.$titleSuffix
    }

    get starshipSizeData () {
      return this.starshipSizes.find(({ name }) => name === this.sizeName)
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(:title="title")
    BackButton
    div( v-if="starshipSizeData" ).text-left
      h1 {{ starshipSizeData.name }} Ships
      VueMarkdown(:source="starshipSizeData.fullText.replace(/\ufffd/g, '-')")
    Loading(v-else)
</template>
