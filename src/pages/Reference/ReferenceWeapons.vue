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
        { text: 'Name', value: 'name' }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Weapons
    br
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        VueMarkdown {{ props.item.description }}
</template>
