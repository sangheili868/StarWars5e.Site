<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { ManeuverReferenceType } from '@/types/characterTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const maneuversModule = namespace('maneuvers')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class CharactersManeuvers extends Vue {
    @maneuversModule.State maneuvers!: ManeuverReferenceType[]
    @maneuversModule.Action fetchManeuvers!: () => void
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Maneuvers'

    created () {
      this.fetchManeuvers()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.maneuvers)
        .map(maneuver => ({
          ...maneuver,
          id: maneuver.name,
          isExpandable: maneuver.description
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Type',
          value: 'type',
          render: _.startCase,
          filterChoices: ['General', 'Mental', 'Physical'],
          filterFunction: ({ type }: ManeuverReferenceType, filterValue: string) => _.startCase(type) === filterValue
        },
        {
          text: 'Prerequisite',
          value: 'prerequisite',
          render: (prerequisite: string) => prerequisite ? 'Yes' : 'No',
          filterChoices: [ 'Yes', 'No' ],
          filterFunction: ({ prerequisite }: ManeuverReferenceType, filterValue: string) => (prerequisite ? 'Yes' : 'No') === filterValue
        },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC'],
          filterFunction: ({ contentSource }: ManeuverReferenceType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    h1 Maneuvers
    br
    SearchTable(name="Maneuvers", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        i(v-if="props.item.prerequisite")
            VueMarkdown(:source="'Prerequisite: ' + props.item.prerequisite")
        VueMarkdown(:source="props.item.description")
</template>
