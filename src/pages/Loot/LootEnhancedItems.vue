<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { EnhancedItemType } from '@/types/lootTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const enhancedItemsModule = namespace('enhancedItems')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class LootEnhancedItems extends Vue {
    @enhancedItemsModule.State enhancedItems!: EnhancedItemType[]
    @enhancedItemsModule.Action fetchEnhancedItems!: () => void
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Enhanced Items'

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
          isMultiSelect: true,
          render: _.startCase,
          filterChoices: ['Adventuring Gear', 'Armor', 'Armor Modification', 'Blaster Modification', 'Consumable', 'Clothing Modification',
           'Cybernetic Augmentation', 'Droid Customization', 'Focus', 'Focus Generator Modification', 'Item Modification',
           'Lightweapon Modification', 'Shield', 'Weapon', 'Wristpad Modification', 'Valuable', 'Vibroweapon Modification' ],
          filterFunction: ({ type }: EnhancedItemType, filterValue: string[]) => _.includes(filterValue, _.startCase(type))
        },
        {
          text: 'Subtype',
          value: 'subtype',
          render: _.startCase
        },
        {
          text: 'Rarity',
          value: 'rarityText',
          isMultiSelect: true,
          filterChoices: ['Standard', 'Premium', 'Prototype', 'Advanced', 'Legendary', 'Artifact'],
          render: _.startCase,
          filterFunction: ({ searchableRarity }: EnhancedItemType, filterValue: string[]) => _.includes(filterValue, searchableRarity)
        },
        {
          text: 'Prerequisite',
          value: 'prerequisite',
          render: (prerequisite: string) => prerequisite ? 'Yes' : 'No',
          filterChoices: [ 'Yes', 'No' ],
          filterFunction: ({ prerequisite }: EnhancedItemType, filterValue: string) => (prerequisite ? 'Yes' : 'No') === filterValue
        },
        {
          text: 'Attunement',
          value: 'requiresAttunement',
          render: (requiresAttunement: boolean) => requiresAttunement ? 'Yes' : 'No',
          filterChoices: [ 'Yes', 'No' ],
          filterFunction: ({ requiresAttunement }: EnhancedItemType, filterValue: string) => (requiresAttunement ? 'Yes' : 'No') === filterValue
        },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['EC', 'WH'],
          filterFunction: ({ contentSource }: EnhancedItemType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    h1 Enhanced Items
    br
    SearchTable(name="EnhancedItems", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        i(v-if="props.item.prerequisite")
          VueMarkdown(:source="'Prerequisite: ' + props.item.prerequisite")
        VueMarkdown(:source="props.item.text")
</template>
