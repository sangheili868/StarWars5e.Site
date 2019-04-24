<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { MonsterType } from '@/types'
  import _ from 'lodash'

  const monsterModule = namespace('monsters')

  @Component({
    components: {
      SearchTable
    }
  })
  export default class ReferenceMonsters extends Vue {
    @monsterModule.State monsters!: MonsterType[]
    @monsterModule.Action fetchMonsters!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean

    created () {
      this.fetchMonsters()
    }

    get items () {
      const page = this.isInHandbook ? 'handbook' : 'reference'
      return _(this.monsters)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Base')
        .map(monster => ({
          ...monster,
          to: `/${page}/monsters/${monster.name}`
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Size', value: 'size' },
        { text: 'Types', value: 'types', render: (types: string[]) => types.map(_.upperFirst).join(', ') },
        { text: 'Alignment', value: 'alignment', render: _.startCase },
        { text: 'CR', value: 'challengeRating' },
        { text: 'Source', value: 'contentType' }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Monsters
    br
    SearchTable(v-bind="{ headers, items }")
</template>
