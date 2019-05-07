<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { SpeciesType, AbilitiesIncreasedType } from '@/types'
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

      return _.filter(this.species, ({ contentType }) => !this.isInHandbook || contentType === 'Base')
        .map(species => ({
          ...species,
          to: `/${page}/species/${species.name}`
        }))
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Ability Score Increase',
          value: 'abilitiesIncreased',
          isFilterable: true,
          isMultiSelect: true,
          filterChoices: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma', 'Any'],
           render: (value: AbilitiesIncreasedType[][]) => value.map(broadChoices =>
            broadChoices.map(({ abilities, amount }) => `${abilities.join(' or ')} +${amount}`).join(', ')
          ).join('; '),
          filterFunction: (item: SpeciesType, filterValue: string[]) => {
            let abilities : string[]
            var mappedBroadChoices = _.map(item.abilitiesIncreased, (broadChoices:any) => {
              let mappedSpecificChoices = _.map(broadChoices, (specificChoice: any) => {
                return specificChoice.abilities
              })
              return _.flatten(mappedSpecificChoices)
            })
            let x = _.flatten(mappedBroadChoices)
            if (_.difference(filterValue, x).length === 0) {
              return true
            }
            return false
          },
         
        },
        {
          text: 'Size',
          value: 'size',
          isFilterable: true,
          filterChoices: ['Medium', 'Small'],
          filterFunction: (item: SpeciesType, filterValue: string) => _.includes(item.size, filterValue)
        },
        {
          text: 'Source',
          value: 'contentType',
          render: _.startCase,
          isFilterable: true,
          filterChoices: ['Base', 'Expanded Content'],
          filterFunction: (item: SpeciesType, filterValue: string) => _.includes(item.contentType, filterValue.replace(/\s/g, ''))
        }
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
