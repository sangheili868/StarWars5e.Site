<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ArchetypeType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'

  const archetypeModule = namespace('archetypes')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class ReferenceArchetypesDetail extends Vue {
    @archetypeModule.State archetypes!: ArchetypeType[]
    @archetypeModule.Action fetchArchetypes!: () => void

    @Prop(String) readonly archetypeName!: string

    created () {
      this.fetchArchetypes()
    }

    get archetypeData () {
      return this.archetypes.find(({ name }: ArchetypeType) => name === this.archetypeName)
    }
  }
</script>

<template lang="pug">
  div( v-if="archetypeData" ).text-xs-left
    h1 {{ archetypeData.name }}
    p {{ archetypeData }}
</template>
