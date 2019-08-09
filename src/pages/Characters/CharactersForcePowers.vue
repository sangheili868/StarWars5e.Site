<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { PowerType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const powersModule = namespace('powers')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class CharactersForcePowers extends Vue {
    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void
    initialSearch: string | (string | null)[] = ''

    created () {
      this.fetchPowers()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.powers)
        .filter(({ powerType }) => powerType === 'Force')
        .map(powers => ({
          ...powers,
          id: powers.name,
          isExpandable: powers.description
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Level',
          value: 'level',
          render: (value: string) => value || 'At-will',
          isMultiSelect: true,
          filterChoices: ['At-will', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          filterFunction: ({ level }: PowerType, filterValue: string[]) => _.includes(filterValue, (level || 'At-will').toString())
        },
        {
          text: 'Force Alignment',
          value: 'forceAlignment',
          isMultiSelect: true,
          filterChoices: ['Dark', 'Light', 'Universal'],
          filterFunction: ({ forceAlignment }: PowerType, filterValue: string[]) => _.includes(filterValue, forceAlignment)
        },
        {
          text: 'Casting Period',
          value: 'castingPeriodText',
          isMultiSelect: true,
          filterChoices: ['1 action', '1 bonus action', '1 reaction', '1 hour', '8 hours', '1 minute', '10 minutes'],
          filterFunction: ({ castingPeriodText }: PowerType, filterValue: string[]) =>
            _.some(filterValue, (filter: string) => _.includes(castingPeriodText, filter))
        },
        {
          text: 'Range',
          value: 'range'
        },
        {
          text: 'Duration',
          value: 'duration',
          render: _.upperFirst,
          isMultiSelect: true,
          filterChoices: ['1 hour', '1 minute', '10 minutes', '24 hours', '8 hours', 'Instantaneous'],
          filterFunction: ({ duration }: PowerType, filterValue: string[]) => _.some(filterValue, (filter: string) => _.includes(duration, filter))
        },
        {
          text: 'Concentration',
          value: 'concentration',
          render: (value: boolean) => value ? 'Concentration' : '-',
          filterChoices: ['No', 'Yes'],
          filterFunction: ({ concentration }: PowerType, filterValue: string) => {
            if (concentration && filterValue === 'Yes') return true
            if (!concentration && filterValue === 'No') return true
            return false
          }
        },
        { text: 'Prerequisite', value: 'prerequisite', render: (value: string) => value || '-' }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Force Powers
    br
    SearchTable(v-bind="{ headers, items, initialSearch }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
