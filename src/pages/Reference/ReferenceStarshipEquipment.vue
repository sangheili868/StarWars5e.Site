<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { starshipEquipmentType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const starshipEquipmentModule = namespace('starshipEquipment')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class ReferencestarshipEquipment extends Vue {
    @starshipEquipmentModule.State starshipEquipment!: starshipEquipmentType[]
    @starshipEquipmentModule.Action fetchStarshipEquipment!: () => void

    created () {
      this.fetchStarshipEquipment()
    }

    get items () {
      return _(this.starshipEquipment)
        .map(starshipEquipment => ({
          ...starshipEquipment,
          id: starshipEquipment.name
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
    h1 Starship Equipment
    br
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        VueMarkdown {{ props.item.description }}
</template>
