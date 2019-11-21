<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { VentureType } from '@/types/starshipTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const venturesModule = namespace('ventures')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class StarshipsVentures extends Vue {
    @venturesModule.State ventures!: VentureType[]
    @venturesModule.Action fetchVentures!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInBook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = this.isInBook ? 'Customization Options | Starships' : 'Starship Ventures'

    created () {
      this.fetchVentures()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.ventures)
        .map(venture => ({
          ...venture,
          id: venture.name,
          isExpandable: venture.content
        })).value()
    }

    get allPrerequisites () {
      return _.chain(this.ventures)
        .flatMap(({ prerequisites }) => prerequisites)
        .sortBy(prerequisite => {
          const splitPrerequisite = prerequisite.split(' ')
          return splitPrerequisite[splitPrerequisite.length - 1]
        })
        .concat(['None'])
        .value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Prerequisites',
          value: 'prerequisites',
          render: (prerequisites: string[]) => _.upperFirst(prerequisites.join(', ') || '-'),
          isMultiSelect: true,
          filterChoices: this.allPrerequisites,
          filterFunction: ({ prerequisites }: VentureType, filterValue: string[]) =>
            _.some(filterValue, (filter: string) => _.includes(prerequisites, filter)) ||
            (_.includes(filterValue, 'None') && prerequisites.length === 0)
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    h1 Ventures
    br
    SearchTable(name="StarshipsVentures", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.content")
</template>
