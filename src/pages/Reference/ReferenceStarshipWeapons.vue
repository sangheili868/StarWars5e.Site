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
  export default class ReferenceStarshipWeapons extends Vue {
    @starshipWeaponsModule.State starshipWeapons!: StarshipWeaponType[]
    @starshipWeaponsModule.Action fetchStarshipWeapons!: () => void

    created () {
      this.fetchStarshipWeapons()
    }

    get items () {
      return _(this.starshipWeapons)
        .map(starshipWeapons => ({
          ...starshipWeapons,
          id: starshipWeapons.name
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
    h1 Starship Weapons
    br
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        VueMarkdown {{ props.item.description }}
</template>
