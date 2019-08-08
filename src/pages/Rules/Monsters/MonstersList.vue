<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { MonsterType } from '@/types'
  import _ from 'lodash'
  import MonsterDescription from './MonsterDescription.vue'
  import math from 'mathjs'

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

    created () {
      this.fetchMonsters()
    }

    customSort (items: any[], index: string, isDescending: boolean) {
      items.sort((a, b) => {
        if (index === 'challengeRating') {
          if (!isDescending) {
            return math.eval(a[index]) < math.eval(b[index]) ? -1 : 1
          } else {
            return math.eval(b[index]) < math.eval(a[index]) ? -1 : 1
          }
        } else {
          if (!isDescending) {
            return a[index] < b[index] ? -1 : 1
          } else {
            return b[index] < a[index] ? -1 : 1
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

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Size',
          value: 'size',
          filterChoices: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'],
          isMultiSelect: true,
          filterFunction: ({ size }: MonsterType, filterValue: string[]) => _.some(filterValue, (filter: string) => filter === size)
        },
        {
          text: 'Type',
          value: 'types',
          render: (types: string[]) => types.map(_.upperFirst).join(', '),
          filterChoices: ['Beast', 'Construct', 'Droid', 'Force-wielder', 'Humanoid', 'Swarm'],
          isMultiSelect: true,
          filterFunction: ({ types }: MonsterType, filterValue: string[]) => _.some(filterValue, (filter: string) =>
            _.some(types.map(_.upperFirst), (type: string) => _.includes(type, filter)))
        },
        {
          text: 'CR',
          value: 'challengeRating',
          filterChoices: ['0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19'],
          isMultiSelect: true,
          filterFunction: ({ challengeRating }: MonsterType, filterValue: string[]) => _.some(filterValue, (filter: string) => filter === challengeRating.toString())
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Monsters
    br
    SearchTable(v-bind="{ headers, items, customSort }")
      template(v-slot:default="{ item }")
        MonsterDescription(:monster="item")
</template>
