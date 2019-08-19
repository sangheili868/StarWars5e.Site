<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { StarshipEquipmentType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const starshipEquipmentModule = namespace('starshipEquipment')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class StarshipsEquipment extends Vue {
    @starshipEquipmentModule.State starshipEquipment!: StarshipEquipmentType[]
    @starshipEquipmentModule.Action fetchStarshipEquipment!: () => void
    initialSearch: string | (string | null)[] = ''

    created () {
      this.fetchStarshipEquipment()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.starshipEquipment)
        .map(starshipEquipment => ({
          ...starshipEquipment,
          id: starshipEquipment.name,
          isExpandable: false
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Cost', value: 'cost' },
        {
          text: 'Type',
          value: 'type',
          filterChoices: ['Ammunition', 'Armor', 'Hyperdrive', 'Navcomputer', 'Shield'],
          isMultiSelect: true,
          filterFunction: ({ type }: StarshipEquipmentType, filterValue: string[]) => _.some(filterValue, (filter: string) => filter === type)
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Starship Equipment
    br
    SearchTable(v-bind="{ headers, items, initialSearch }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
