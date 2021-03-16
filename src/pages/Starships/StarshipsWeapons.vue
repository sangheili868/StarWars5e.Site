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
  export default class StarshipsWeapons extends Vue {
    @starshipEquipmentModule.State starshipEquipment!: StarshipEquipmentType[]
    @starshipEquipmentModule.Action fetchStarshipEquipment!: () => void
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Starship Weapons'

    created () {
      this.fetchStarshipEquipment()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.starshipEquipment)
        .filter(({ type }: StarshipEquipmentType) => type === 'Weapon')
        .map(starshipEquipment => ({
          ...starshipEquipment,
          id: starshipEquipment.name,
          isExpandable: false
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Category',
          value: 'weaponCategory',
          isMultiSelect: true,
          filterChoices: ['Primary', 'Secondary', 'Tertiary', 'Quaternary'],
          filterFunction: ({ weaponCategory }: StarshipEquipmentType, filterValue: string[]) =>
            _.some(filterValue, (filter: string) => _.includes(weaponCategory, filter))
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Damage', value: 'damageNumberOfDice', render: this.weaponDamage },
        { text: 'Properties', value: 'properties' }
      ]
    }

    weaponDamage (field: string, fields: StarshipEquipmentType) {
      let modifier = ''
      if (fields.damageDieModifier && fields.damageDieModifier > 0) modifier = `+${fields.damageDieModifier}`
      if (fields.damageDieModifier && fields.damageDieModifier < 0) modifier = fields.damageDieModifier.toString()
      return fields.damageNumberOfDice ? `${fields.damageNumberOfDice}d${fields.damageDieType}${modifier} ${fields.damageType}` : 'Special'
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    h1 Starship Weapons
    br
    SearchTable(name="StarshipWeapons", v-bind="{ headers, items, initialSearch, tableType }")
</template>
