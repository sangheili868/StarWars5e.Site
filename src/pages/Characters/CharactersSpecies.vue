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
  export default class CharactersSpecies extends Vue {
    @speciesModule.State species!: SpeciesType[]
    @speciesModule.Action fetchSpecies!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean

    numWordMap: { [key: string]: number } = {
      one: 1,
      two: 2,
      four: 4
    }

    created () {
      this.fetchSpecies()
    }

    get items () {
      const page = this.isInHandbook ? 'handbook' : 'characters'
      return _(this.species)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(species => ({
          ...species,
          to: `/${page}/species/${species.name}`
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Ability Score Increase',
          value: 'abilitiesIncreased',
          isMultiSelect: true,
          filterChoices: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'],
          render: (value: AbilitiesIncreasedType[][]) => value.map(broadChoices =>
            broadChoices.map(({ abilities, amount }) => `${abilities.join(' or ')} +${amount}`).join(', ')
          ).join('; '),
          filterFunction: ({ abilitiesIncreased }: SpeciesType, filterValue: string[]) => {
            return abilitiesIncreased.some(broadChoice => {
              return filterValue.length <= _.reduce(broadChoice, (acc: number, value: AbilitiesIncreasedType) => {
                const freeChoices = this.numWordMap[value.abilities[0].split(' ')[1]] || 0
                const isMatch = Math.min(_.intersection(value.abilities, filterValue).length, 1)
                return acc + freeChoices + isMatch
              }, 0)
            })
          }
        },
        {
          text: 'Size',
          value: 'size',
          filterChoices: ['Medium', 'Small'],
          filterFunction: ({ size }: SpeciesType, filterValue: string) => size === filterValue
        },
        {
          text: 'Source',
          value: 'contentType',
          render: _.startCase,
          filterChoices: ['Core', 'Expanded Content'],
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
