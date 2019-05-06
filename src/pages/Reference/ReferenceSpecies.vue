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
      const page = this.isInHandbook ? 'handbook' : 'reference'
      return _(this.species)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Base')
        .map(species => ({
          ...species,
          to: `/${page}/species/${species.name}`
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Distinctions', value: 'distinctions' },
        {
          text: 'Ability Score Increase',
          value: 'abilitiesIncreased',
          render: (value: any) => {
            var mappedBroadChoices = _.map(value, (broadChoices:any) => {
              var mappedSpecificChoices = _.map(broadChoices, (specificChoice: any) => {
                if (specificChoice.abilities.count > 1) {
                return `${specificChoice.abilities.join(' or ')} +${specificChoice.amount}`
                }
                return `${specificChoice.abilities[0]} +${specificChoice.amount}`
              })
              return mappedSpecificChoices.join(', ')
            })
            return mappedBroadChoices.join('; ')
          }
        },
        { text: 'Source', value: 'contentType', render: _.startCase }
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
