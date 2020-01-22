<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { WeaponType } from '@/types/lootTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import LootWeaponsProperties from './LootWeaponsProperties.vue'
  import BackButton from '@/components/BackButton.vue'

  const weaponsModule = namespace('weapons')

  @Component({
    components: {
      SearchTable,
      VueMarkdown,
      LootWeaponsProperties,
      BackButton
    }
  })
  export default class LootWeapons extends Vue {
    @weaponsModule.State weapons!: WeaponType[]
    @weaponsModule.Action fetchWeapons!: () => void
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Weapons'

    created () {
      this.fetchWeapons()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.weapons)
        .map(weapons => ({
          ...weapons,
          id: weapons.name,
          isExpandable: true
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Type',
          value: 'weaponClassification',
          render: _.startCase,
          filterChoices: ['Simple Blaster', 'Martial Blaster', 'Simple Lightweapon', 'Martial Lightweapon', 'Simple Vibroweapon', 'Martial Vibroweapon'],
          filterFunction: ({ weaponClassification }: WeaponType, filterValue: string) => _.startCase(weaponClassification) === filterValue
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Weight', value: 'weight' },
        { text: 'Damage', value: 'damageNumberOfDice', render: this.weaponDamage },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC'],
          filterFunction: ({ contentSource }: WeaponType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }

    weaponDamage (field: string, fields: WeaponType) {
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
