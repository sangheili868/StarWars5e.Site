<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { StarshipEquipmentType } from '@/types/starshipTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const starshipEquipmentModule = namespace('starshipEquipment')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class StarshipsEquipment extends Vue {
    @starshipEquipmentModule.State starshipEquipment!: StarshipEquipmentType[]
    @starshipEquipmentModule.Action fetchStarshipEquipment!: () => void
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Starship Equipment'

    created () {
      this.fetchStarshipEquipment()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.starshipEquipment)
        .map(starshipEquipment => ({
          ...starshipEquipment,
          id: starshipEquipment.name,
          isExpandable: starshipEquipment.description
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
    BackButton
    h1 Starship Equipment
    br
    SearchTable(name="starshipEquipment", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
