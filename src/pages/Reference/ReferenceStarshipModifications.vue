<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { StarshipModificationType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const starshipModificationsModule = namespace('starshipModifications')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class ReferenceStarshipModifications extends Vue {
    @starshipModificationsModule.State starshipModifications!: StarshipModificationType[]
    @starshipModificationsModule.Action fetchStarshipModifications!: () => void

    created () {
      this.fetchStarshipModifications()
    }

    get items () {
      return _(this.starshipModifications)
        .map(starshipModifications => ({
          ...starshipModifications,
          id: starshipModifications.name,
          isExpandable: starshipModifications.content
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Type',
          value: 'type',
          filterChoices: ['Engineering', 'Operation', 'Suite', 'Universal', 'Weapon'],
          isMultiSelect: true,
          filterFunction: ({ type }: StarshipModificationType, filterValue: string[]) => _.some(filterValue, (filter: string) => filter === type)
        },
        {
          text: 'Prerequisites',
          value: 'prerequisites',
          render: (prerequisites: string[]) => _.upperFirst(prerequisites.join(', ') || '-')
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Starship Modifications
    br
    SearchTable(v-bind="{ headers, items }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.content")
</template>
