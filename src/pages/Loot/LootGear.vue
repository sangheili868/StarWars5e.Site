<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { EquipmentType } from '@/types/lootTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'
  import math from 'mathjs'

  const equipmentModule = namespace('equipment')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class LootGear extends Vue {
    @equipmentModule.State equipment!: EquipmentType[]
    @equipmentModule.Action fetchEquipment!: () => void
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Adventuring Gear'

    created () {
      this.fetchEquipment()
      this.initialSearch = this.$route.query.search
    }

    customSort (items: any[], sortBy: string[], sortDesc: boolean[]) {
      items.sort((a, b) => {
        if (sortBy[0] === 'weight' && parseFloat(a[sortBy[0]]) && parseFloat(b[sortBy[0]])) {
          if (!sortDesc[0]) {
            return math.eval(a[sortBy[0]]) < math.eval(b[sortBy[0]]) ? -1 : 1
          } else {
            return math.eval(b[sortBy[0]]) < math.eval(a[sortBy[0]]) ? -1 : 1
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
      return _(this.equipment)
        .filter(({ equipmentCategory }: EquipmentType) => !['Weapon', 'Armor'].includes(equipmentCategory))
        .map(equipment => ({
          ...equipment,
          id: equipment.name,
          isExpandable: equipment.description
        })).value()
    }

    get categories () {
      return _(this.items).map(({ equipmentCategory }) => (
          _.startCase(equipmentCategory)
      )).flattenDeep().compact().sortBy().uniq().value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Category',
          value: 'equipmentCategory',
          render: _.startCase,
          filterChoices: this.categories,
          filterFunction: ({ equipmentCategory }: EquipmentType, filterValue: string) => _.startCase(equipmentCategory) === filterValue
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Weight (lb)', value: 'weight' },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC', 'WH'],
          filterFunction: ({ contentSource }: EquipmentType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    h1 Gear
    br
    SearchTable(name="Gear", v-bind="{ headers, items, customSort, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
