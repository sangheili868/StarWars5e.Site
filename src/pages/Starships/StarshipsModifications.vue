<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { StarshipModificationType } from '@/types/starshipTypes'
  import _ from 'lodash'
  import BackButton from '@/components/BackButton.vue'
  import VueMarkdown from 'vue-markdown'

  const starshipModificationsModule = namespace('starshipModifications')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class StarshipsModifications extends Vue {
    @starshipModificationsModule.State starshipModifications!: StarshipModificationType[]
    @starshipModificationsModule.Action fetchStarshipModifications!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInBook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = this.isInBook ? 'Modifications | Starships' : 'Starship Modifications'

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

    get grades () {
      return _(this.items).map(({ grade }) => (
          grade
      )).sortBy().uniq().value()
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
          text: 'Grade',
          value: 'grade',
          filterChoices: this.grades,
          isMultiSelect: true,
          filterFunction: ({ grade }: StarshipModificationType, filterValue: string[]) => _.some(filterValue, (filter: number) => filter === grade)
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
    BackButton
    h1 Starship Modifications
    br
    SearchTable(name="starshipModifications", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.content")
</template>
