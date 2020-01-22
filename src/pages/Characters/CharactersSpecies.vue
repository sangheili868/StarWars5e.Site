<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { SpeciesType, AbilitiesIncreasedType } from '@/types/characterTypes'
  import _ from 'lodash'
  import BackButton from '@/components/BackButton.vue'

  const speciesModule = namespace('species')

  @Component({
    components: {
      BackButton,
      SearchTable
    }
  })
  export default class CharactersSpecies extends Vue {
    @speciesModule.State species!: SpeciesType[]
    @speciesModule.Action fetchSpecies!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = this.isInHandbook ? 'Species | Handbook' : 'Species'

    numWordMap: { [key: string]: number } = {
      one: 1,
      two: 2,
      four: 4
    }

    created () {
      this.fetchSpecies()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'rules/handbook' : 'characters'
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
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC'],
          filterFunction: ({ contentSource }: SpeciesType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Species
    br
    SearchTable(name="Species", v-bind="{ headers, items, initialSearch, tableType }")
</template>
