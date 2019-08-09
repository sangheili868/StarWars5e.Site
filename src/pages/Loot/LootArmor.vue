<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { ArmorType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const armorModule = namespace('armor')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class LootArmor extends Vue {
    @armorModule.State armor!: ArmorType[]
    @armorModule.Action fetchArmor!: () => void
    initialSearch: string | (string | null)[] = ''

    created () {
      this.fetchArmor()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.armor)
        .map(armor => ({
          ...armor,
          id: armor.name,
          isExpandable: armor.description
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name', render: _.startCase },
        {
          text: 'Type',
          value: 'armorClassification',
          filterChoices: ['Light', 'Medium', 'Heavy', 'Shield'],
          filterFunction: ({ armorClassification }: ArmorType, filterValue: string) => armorClassification === filterValue
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Weight', value: 'weight' },
        { text: 'AC', value: 'ac' },
        { text: 'Strength', value: 'strengthRequirement' },
        { text: 'Stealth', value: 'stealthDisadvantage', render: (isDisadvantage: boolean) => isDisadvantage ? 'Disadvantage' : '-' },
        { text: 'Source', value: 'contentType', render: _.startCase }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Armor
    br
    SearchTable(v-bind="{ headers, items, initialSearch }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
