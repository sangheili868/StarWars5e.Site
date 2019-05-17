<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { GearType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const gearModule = namespace('gear')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class ReferenceGear extends Vue {
    @gearModule.State gear!: GearType[]
    @gearModule.Action fetchGear!: () => void

    created () {
      this.fetchGear()
    }

    get items () {
      return _(this.gear)
        .map(gear => ({
          ...gear,
          id: gear.name,
          isExpandable: gear.description
        })).value()
    }

    get headers () {
      return [
        {
          text: 'Category',
          value: 'equipmentCategory',
          render: _.startCase,
          filterChoices: ['Ammunition', 'Clothing', 'Communications', 'Data Recording And Storage', 'Explosive', 'Gaming Set',
          'Kit', 'Life Support', 'Medical', 'Musical Instrument', 'Storage', 'Tool'],
          filterFunction: ({ equipmentCategory }: GearType, filterValue: string) => _.startCase(equipmentCategory) === filterValue
        },
        { text: 'Name', value: 'name' },
        { text: 'Cost', value: 'cost' },
        { text: 'Weight', value: 'weight' },
        {
          text: 'Source',
          value: 'contentType',
          render: _.startCase,
          filterChoices: ['Core', 'Expanded Content'],
          filterFunction: ({ contentType }: GearType, filterValue: string) => _.startCase(contentType) === filterValue }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Gear
    br
    SearchTable(v-bind="{ headers, items }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
