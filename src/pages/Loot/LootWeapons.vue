<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { EquipmentType } from '@/types/lootTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import LootWeaponsProperties from './LootWeaponsProperties.vue'
  import BackButton from '@/components/BackButton.vue'

  const equipmentModule = namespace('equipment')

  @Component({
    components: {
      SearchTable,
      VueMarkdown,
      LootWeaponsProperties,
      BackButton
    }
  })
  export default class LootWeapons extends Vue {
    @equipmentModule.State equipment!: EquipmentType[]
    @equipmentModule.Action fetchEquipment!: () => void
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Weapons'

    created () {
      this.fetchEquipment()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.equipment)
        .filter(({ equipmentCategory }: EquipmentType) => equipmentCategory === 'Weapon')
        .map(equipment => ({
          ...equipment,
          id: equipment.name,
          isExpandable: true
        })).value()
    }

    filterProperties (propertiesMap : { [property: string]: string }, filterValue: string[]) {
      var x = Object.keys(propertiesMap)
      var y = _.intersection(x, filterValue)

      return y.length
    }

    get properties () {
      return _(this.items).map(({ propertiesMap }) => (
          Object.keys(propertiesMap)
      )).flattenDeep().compact().sortBy().uniq().value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Type',
          value: 'weaponClassification',
          render: _.startCase,
          filterChoices: ['Simple Blaster', 'Martial Blaster', 'Simple Lightweapon', 'Martial Lightweapon', 'Simple Vibroweapon', 'Martial Vibroweapon'],
          filterFunction: ({ weaponClassification }: EquipmentType, filterValue: string) => _.startCase(weaponClassification) === filterValue
        },
        {
          text: 'Property',
          value: 'propertiesMap',
          isMultiSelect: true,
          render: (propertiesMap: { [property: string]: string }) => Object.values(propertiesMap).map((property) => _.upperFirst(property)).join(', '),
          filterChoices: this.properties,
          filterFunction: ({ propertiesMap }: EquipmentType, filterValue: string[]) => this.filterProperties(propertiesMap, filterValue)
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Weight', value: 'weight' },
        { text: 'Damage', value: 'damageNumberOfDice', render: this.weaponDamage },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC', 'WH'],
          filterFunction: ({ contentSource }: EquipmentType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }

    weaponDamage (field: string, fields: EquipmentType) {
      return fields.damageNumberOfDice ? `${fields.damageNumberOfDice}d${fields.damageDieType} ${fields.damageType}` : 'Special'
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    h1 Weapons
    br
    SearchTable(name="Weapons", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        strong Properties:
        LootWeaponsProperties(:propertyList="props.item.properties")
        span(v-if="props.item.properties.length === 0")  None
        VueMarkdown(v-if="props.item.description", :source="props.item.description")
        div(v-for="(mode, index) in props.item.modes", :key="index").
          #[strong {{ mode.name }}:] {{ weaponDamage('', mode) }}, {{ mode.properties.join(', ') }}
</template>
