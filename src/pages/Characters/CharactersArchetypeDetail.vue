<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ArchetypeType } from '@/types/characterTypes.ts'
  import VueMarkdown from 'vue-markdown'
  import LevelTable from '@/components/LevelTable.vue'
  import Loading from '@/components/Loading.vue'
  import _ from 'lodash'
  import BackButton from '@/components/BackButton.vue'

  const archetypeModule = namespace('archetypes')

  @Component({
    components: {
      VueMarkdown,
      LevelTable,
      BackButton,
      Loading
    }
  })
  export default class CharactersArchetypesDetail extends Vue {
    @archetypeModule.State archetypes!: ArchetypeType[]
    @archetypeModule.Action fetchArchetypes!: () => void

    @Prop(String) readonly archetypeName!: string
    @Prop(Boolean) readonly isHidingBack!: boolean

    created () {
      this.fetchArchetypes()
    }

    get title () {
        return this.archetypeName + Vue.prototype.$titleSuffix
    }

    get archetype () {
      return this.archetypes.find(({ name }: ArchetypeType) => name === this.archetypeName)
    }

    toOrdinalSuffix = (value: number) => {
      const digits = [value % 10, value % 100]
      const ordinals = ['st', 'nd', 'rd', 'th']
      const oPattern = [1, 2, 3, 4]
      const tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]
      return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
        ? value + ordinals[digits[0] - 1]
        : value + ordinals[3]
    };

    get correctedLevels () {
      return this.archetype && _.mapValues(this.archetype.leveledTable, (fields, index) => ({
        Level: this.toOrdinalSuffix(parseInt(index)),
        ..._(fields)
          .keyBy('key')
          .mapValues('value')
          .value()
      }))
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(v-if="!isHidingBack", :title="title")
    BackButton(v-if="!isHidingBack")
    div(v-if="archetype").text-left
      h1 {{ archetype.name.replace(/\ufffd/g, '-') }}
      VueMarkdown(:source="archetype.text")
      LevelTable(:title="archetype.name", :levels="correctedLevels")
    Loading(v-else)
</template>
