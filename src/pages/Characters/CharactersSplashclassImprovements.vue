<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { SplashclassImprovementType } from '@/types/characterTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const splashclassImprovementModule = namespace('splashclassImprovements')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class CharactersSplashclassImprovements extends Vue {
    @splashclassImprovementModule.State splashclassImprovements!: SplashclassImprovementType[]
    @splashclassImprovementModule.Action fetchSplashclassImprovements!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Splashclass Improvements'

    created () {
      this.fetchSplashclassImprovements()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'phb' : 'characters'
      return _(this.splashclassImprovements)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(splashclassImprovement => ({
          ...splashclassImprovement,
          id: splashclassImprovement.name,
          isExpandable: splashclassImprovement.description
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
          filterFunction: ({ contentSource }: SplashclassImprovementType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Splashclass Improvements
    br
    SearchTable(name="SplashclassImprovements", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
