<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { EnhancedItemType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const enhancedItemsModule = namespace('enhancedItems')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class LootEnhancedItems extends Vue {
    @enhancedItemsModule.State enhancedItems!: EnhancedItemType[]
    @enhancedItemsModule.Action fetchEnhancedItems!: () => void
    initialSearch: string | (string | null)[] = ''

    created () {
      this.fetchEnhancedItems()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.enhancedItems)
        .map(enhancedItem => ({
          ...enhancedItem,
          id: enhancedItem.name,
          isExpandable: enhancedItem.text
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Type',
          value: 'type',
          render: _.startCase,
          filterChoices: ['Adventuring Gear', 'Armor', 'Consumable', 'Cybernetic Augmentation', 'Droid Customization',
           'Focus', 'Item Modification', 'Shield', 'Weapon', 'Valuable' ],
          filterFunction: ({ type }: EnhancedItemType, filterValue: string) => _.startCase(type) === filterValue
        },
        {
          text: 'Subtype',
          value: 'subtype',
          render: _.startCase
        },
        {
          text: 'Rarity',
          value: 'rarityText',
          filterChoices: ['Standard', 'Premium', 'Prototype', 'Advanced', 'Legendary',
           'Artifact', 'Multiple' ],
          filterFunction: ({ searchableRarity }: EnhancedItemType, filterValue: string) => searchableRarity === filterValue
        },
        { text: 'Value', value: 'valueText' },
        {
          text: 'Attunement',
          value: 'requiresAttunement',
          render: (requiresAttunement: boolean) => requiresAttunement ? 'Yes' : 'No',
          filterChoices: [ 'Yes', 'No' ],
          filterFunction: ({ requiresAttunement }: EnhancedItemType, filterValue: string) => (requiresAttunement ? 'Yes' : 'No') === filterValue
        },
        { text: 'Source', value: 'contentType', render: _.startCase }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Enhanced Items
    br
    SearchTable(v-bind="{ headers, items, initialSearch }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.text")
</template>
