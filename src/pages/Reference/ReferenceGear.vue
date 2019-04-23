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
        { text: 'Name', value: 'name' }
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
        VueMarkdown {{ props.item.description }}
</template>
