<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ArchetypeType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'
  import LevelTable from '@/components/LevelTable.vue'
  import Loading from '@/components/Loading.vue'

  const archetypeModule = namespace('archetypes')

  @Component({
    components: {
      VueMarkdown,
      LevelTable,
      Loading
    }
  })
  export default class ReferenceArchetypesDetail extends Vue {
    @archetypeModule.State archetypes!: ArchetypeType[]
    @archetypeModule.Action fetchArchetypes!: () => void

    @Prop(String) readonly archetypeName!: string

    created () {
      this.fetchArchetypes()
    }

    get archetype () {
      return this.archetypes.find(({ name }: ArchetypeType) => name === this.archetypeName)
    }
  }
</script>

<template lang="pug">
  div( v-if="archetype" ).text-xs-left
    h1 {{ archetype.name }}
    VueMarkdown(:source="archetype.text")
    LevelTable(:title="archetype.name", :levels="archetype.leveledTable")
  Loading(v-else)
</template>
