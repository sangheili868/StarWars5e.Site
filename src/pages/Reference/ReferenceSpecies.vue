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
      return _(this.species)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
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
            let choices = _.flatten(item.abilitiesIncreased.map(broadChoices =>
             _.flatten(broadChoices.map(specificChoice => specificChoice.abilities))))

            if (_.difference(filterValue, choices).length === 0) {
              return true
            }
            return false
          }
        },
        {
          text: 'Size',
          value: 'size',
          isFilterable: true,
          filterChoices: ['Medium', 'Small'],
          filterFunction: ({ size }: SpeciesType, filterValue: string) => size === filterValue
        },
        {
          text: 'Source',
          value: 'contentType',
          render: _.startCase,
          isFilterable: true,
          filterChoices: ['Base', 'Expanded Content'],
          filterFunction: ({ contentType }: SpeciesType, filterValue: string) => _.startCase(contentType) === filterValue
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
