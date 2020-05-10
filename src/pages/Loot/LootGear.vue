<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { EquipmentType } from '@/types/lootTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

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

    get items () {
      return _(this.equipment)
        .filter(({ equipmentCategory }: EquipmentType) => !['Weapon', 'Armor'].includes(equipmentCategory))
        .map(equipment => ({
          ...equipment,
          id: equipment.name,
          isExpandable: equipment.description
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Category',
          value: 'equipmentCategory',
          render: _.startCase,
          filterChoices: ['Ammunition', 'Clothing', 'Communications', 'Data Recording And Storage', 'Explosive', 'Gaming Set',
          'Kit', 'Life Support', 'Medical', 'Musical Instrument', 'Storage', 'Tool', 'Utility', 'Weapon Or Armor Accessory'],
          filterFunction: ({ equipmentCategory }: EquipmentType, filterValue: string) => _.startCase(equipmentCategory) === filterValue
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Weight', value: 'weight' },
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
    SearchTable(name="Gear", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
