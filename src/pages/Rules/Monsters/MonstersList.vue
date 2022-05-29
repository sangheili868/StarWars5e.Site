<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { MonsterType } from '@/types/referenceTypes'
  import _ from 'lodash'
  import MonsterDescription from './MonsterDescription.vue'
  import { evaluate } from 'mathjs'

  const monsterModule = namespace('monsters')

  @Component({
    components: {
      SearchTable,
      MonsterDescription
    }
  })
  export default class MonstersList extends Vue {
    @monsterModule.State monsters!: MonsterType[]
    @monsterModule.Action fetchMonsters!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Monsters'

    created () {
      this.fetchMonsters()
    }

    customSort (items: any[], sortBy: string[], sortDesc: boolean[]) {
      items.sort((a, b) => {
        if (sortBy[0] === 'challengeRating' && parseFloat(a[sortBy[0]]) && parseFloat(b[sortBy[0]])) {
          if (!sortDesc[0]) {
            return evaluate(a[sortBy[0]]) < evaluate(b[sortBy[0]]) ? -1 : 1
          } else {
            return evaluate(b[sortBy[0]]) < evaluate(a[sortBy[0]]) ? -1 : 1
          }
        } else if (sortBy[0] === 'types') {
          if (!sortDesc[0]) {
            return a[sortBy[0]][0].toLowerCase() < b[sortBy[0]][0].toLowerCase() ? -1 : 1
          } else {
            return b[sortBy[0]][0].toLowerCase() < a[sortBy[0]][0].toLowerCase() ? -1 : 1
          }
        } else {
          if (!sortDesc[0]) {
            return (a[sortBy[0]]) < (b[sortBy[0]]) ? -1 : 1
          } else {
            return (b[sortBy[0]]) < (a[sortBy[0]]) ? -1 : 1
          }
        }
      })
      return items
    }

    get items () {
      return _(this.monsters)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(monster => ({
          ...monster,
          id: monster.name,
          isExpandable: true
        })).value()
    }

    get alignments () {
      return _(this.items).map(({ alignment }) => (
          _.startCase(alignment)
      )).flattenDeep().compact().sortBy().uniq().value()
    }

    get sizes () {
      return _(this.items).map(({ size }) => (
          size
      )).compact().sortBy().uniq().value().reverse()
    }

    get types () {
      return _(this.items).map(({ types }) => (
          types.map(_.upperFirst)
      )).flattenDeep().compact().sortBy().uniq().value()
    }

    get challengeRatings () {
        return _(this.items).map(({ challengeRating }) => (
          challengeRating
      )).compact().uniq().sortBy((value) => { return parseFloat(value) ? evaluate(value) : value }).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Size',
          value: 'size',
          filterChoices: this.sizes,
          isMultiSelect: true,
          filterFunction: ({ size }: MonsterType, filterValue: string[]) => _.some(filterValue, (filter: string) => filter === size)
        },
        {
          text: 'Type',
          value: 'types',
          render: (types: string[]) => types.map(_.upperFirst).join(', '),
          filterChoices: this.types,
          isMultiSelect: true,
          filterFunction: ({ types }: MonsterType, filterValue: string[]) => _.some(filterValue, (filter: string) =>
            _.some(types.map(_.upperFirst), (type: string) => _.includes(type, filter)))
        },
        {
          text: 'CR',
          value: 'challengeRating',
          filterChoices: this.challengeRatings,
          isMultiSelect: true,
          filterFunction: ({ challengeRating }: MonsterType, filterValue: string[]) => _.some(filterValue, (filter: string) => filter === challengeRating.toString())
        },
        {
          text: 'Alignment',
          value: 'alignment',
          filterChoices: this.alignments,
          isMultiSelect: true,
          render: (alignment: string) => _.startCase(alignment),
          filterFunction: ({ alignment }: MonsterType, filterValue: string[]) => _.includes(filterValue, _.startCase(alignment))
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Monsters
    br
    SearchTable(name="Monsters", v-bind="{ headers, items, customSort, initialSearch, tableType }")
      template(v-slot:default="{ item }")
        MonsterDescription(:monster="item")
</template>
