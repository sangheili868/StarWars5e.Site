<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { StarshipModificationType } from '@/types'
  import _ from 'lodash'
  import VueMarkdownWithAnchors from '@/components/VueMarkdownWithAnchors.vue'

  const starshipModificationsModule = namespace('starshipModifications')

  @Component({
    components: {
      SearchTable,
      VueMarkdownWithAnchors
    }
  })
  export default class StarshipsModifications extends Vue {
    @starshipModificationsModule.State starshipModifications!: StarshipModificationType[]
    @starshipModificationsModule.Action fetchStarshipModifications!: () => void
    initialSearch: string | (string | null)[] = ''

    created () {
      this.fetchStarshipModifications()
      this.initialSearch = this.$route.query.search
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
    SearchTable(v-bind="{ headers, items, initialSearch }")
      template(v-slot:default="props")
        VueMarkdownWithAnchors(:source="props.item.content")
</template>
