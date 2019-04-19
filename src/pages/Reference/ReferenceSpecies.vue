<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { SpeciesType } from '@/types'
  import _ from 'lodash'

  const speciesModule = namespace('species')

  @Component({
    components: {
      SearchTable
    }
  })
  export default class ReferenceSpecies extends Vue {
    @speciesModule.State species!: SpeciesType[]
    @speciesModule.Action fetchSpecies!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean

    created () {
      this.fetchSpecies()
    }

    get items () {
      return _(this.species)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Base')
        .map(species => ({
          ...species,
          to: `/handbook/species/${species.name}`
        })).value()
    }

    get headers () {
      return [
        { text: 'Content Type', value: 'contentType' },
        { text: 'Name', value: 'name' },
        { text: 'Distinctions', value: 'distinctions' }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Species
    br
    SearchTable(v-bind="{ headers, items }")
</template>
