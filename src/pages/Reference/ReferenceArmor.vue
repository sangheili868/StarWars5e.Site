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
  export default class ReferenceArmor extends Vue {
    @armorModule.State armor!: ArmorType[]
    @armorModule.Action fetchArmor!: () => void

    created () {
      this.fetchArmor()
    }

    get items () {
      return _(this.armor)
        .map(armor => ({
          ...armor,
          id: armor.name
        })).value()
    }

    get headers () {
      return [
        { text: 'Type', value: 'armorClassification' },
        { text: 'Name', value: 'name', render: _.startCase },
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
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        VueMarkdown {{ props.item.description }}
</template>
