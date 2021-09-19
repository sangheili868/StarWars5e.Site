<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { MulticlassImprovementType } from '@/types/characterTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const multiclassImprovementModule = namespace('multiclassImprovements')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class CharactersMulticlassImprovements extends Vue {
    @multiclassImprovementModule.State multiclassImprovements!: MulticlassImprovementType[]
    @multiclassImprovementModule.Action fetchMulticlassImprovements!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Multiclass Improvements'

    created () {
      this.fetchMulticlassImprovements()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'phb' : 'characters'
      return _(this.multiclassImprovements)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(multiclassImprovement => ({
          ...multiclassImprovement,
          id: multiclassImprovement.name,
          isExpandable: multiclassImprovement.description
        })).value()
    }

    get headers () {
      return [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Prerequisite',
          value: 'prerequisite'
        },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC', 'WH'],
          filterFunction: ({ contentSource }: MulticlassImprovementType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Multiclass Improvements
    br
    SearchTable(name="MulticlassImprovements", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
