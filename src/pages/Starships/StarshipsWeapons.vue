<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { StarshipWeaponType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const starshipWeaponsModule = namespace('starshipWeapons')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class StarshipsWeapons extends Vue {
    @starshipWeaponsModule.State starshipWeapons!: StarshipWeaponType[]
    @starshipWeaponsModule.Action fetchStarshipWeapons!: () => void
    initialSearch: string | (string | null)[] = ''

    created () {
      this.fetchStarshipWeapons()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.starshipWeapons)
        .map(starshipWeapons => ({
          ...starshipWeapons,
          id: starshipWeapons.name,
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
          filterFunction: ({ weaponCategory }: StarshipWeaponType, filterValue: string[]) =>
            _.some(filterValue, (filter: string) => _.includes(weaponCategory, filter))
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Damage', value: 'damageNumberOfDice', render: this.weaponDamage },
        { text: 'Attack Bonus', value: 'attackBonus' },
        { text: 'Attacks per Round', value: 'attacksPerRound' }
      ]
    }

    weaponDamage (field: string, fields: StarshipWeaponType) {
      let modifier = ''
      if (fields.damageDieModifier && fields.damageDieModifier > 0) modifier = `+${fields.damageDieModifier}`
      if (fields.damageDieModifier && fields.damageDieModifier < 0) modifier = fields.damageDieModifier.toString()
      return fields.damageNumberOfDice ? `${fields.damageNumberOfDice}d${fields.damageDieType}${modifier} ${fields.damageType}` : 'Special'
    }
  }
</script>

<template lang="pug">
  div
    h1 Starship Weapons
    br
    SearchTable(v-bind="{ headers, items, initialSearch }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
