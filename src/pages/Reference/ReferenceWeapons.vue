<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { WeaponType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const weaponsModule = namespace('weapons')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class ReferenceWeapons extends Vue {
    @weaponsModule.State weapons!: WeaponType[]
    @weaponsModule.Action fetchWeapons!: () => void

    created () {
      this.fetchWeapons()
    }

    get items () {
      return _(this.weapons)
        .map(weapons => ({
          ...weapons,
          id: weapons.name
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
          value: 'contentType',
          render: _.startCase,
          filterChoices: ['Core', 'Expanded Content'],
          filterFunction: ({ contentType }: WeaponType, filterValue: string) => _.startCase(contentType) === filterValue
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
    h1 Weapons
    br
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        div #[strong Properties:] {{ props.item.properties.join(', ') }}
        VueMarkdown(:source="props.item.description")
        div(v-for="(mode, index) in props.item.modes", :key="index").
          #[strong {{ mode.name }}:] {{ weaponDamage('', mode) }}, {{ mode.properties.join(', ') }}
</template>
