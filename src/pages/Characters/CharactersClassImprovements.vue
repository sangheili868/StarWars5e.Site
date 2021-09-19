<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { ClassImprovementType } from '@/types/characterTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const classImprovementModule = namespace('classImprovements')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class CharactersClassImprovements extends Vue {
    @classImprovementModule.State classImprovements!: ClassImprovementType[]
    @classImprovementModule.Action fetchClassImprovements!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Class Improvements'

    created () {
      this.fetchClassImprovements()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'phb' : 'characters'
      return _(this.classImprovements)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(classImprovement => ({
          ...classImprovement,
          id: classImprovement.name,
          isExpandable: classImprovement.description
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
          filterFunction: ({ contentSource }: ClassImprovementType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Class Improvements
    br
    SearchTable(name="ClassImprovements", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
