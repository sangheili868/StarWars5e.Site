<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { BackgroundType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'

  const backgroundModule = namespace('backgrounds')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class ReferenceBackgroundsDetail extends Vue {
    @backgroundModule.State backgrounds!: BackgroundType[]
    @backgroundModule.Action fetchBackgrounds!: () => void

    @Prop(String) readonly backgroundName!: string

    created () {
      this.fetchBackgrounds()
    }

    get backgroundData () {
      return this.backgrounds.find(({ name }: BackgroundType) => name === this.backgroundName)
    }
  }
</script>

<template lang="pug">
  div( v-if="backgroundData" ).text-xs-left
    h1 {{ backgroundData.name }}
    p {{ backgroundData }}
</template>
