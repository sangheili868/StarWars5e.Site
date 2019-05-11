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
          id: gear.name
        })).value()
    }

    get headers () {
      return [
        { text: 'Category', value: 'equipmentCategory', render: _.startCase },
        { text: 'Name', value: 'name' },
        { text: 'Cost', value: 'cost' },
        { text: 'Weight', value: 'weight' },
        { text: 'Source', value: 'contentType', render: _.startCase }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Gear
    br
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
