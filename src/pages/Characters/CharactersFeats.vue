<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { FeatType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const archetypeModule = namespace('feats')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class CharactersFeats extends Vue {
    @archetypeModule.State feats!: FeatType[]
    @archetypeModule.Action fetchFeats!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean

    initialSearch: string | (string | null)[] = ''

    created () {
      this.fetchFeats()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'handbook' : 'characters'
      return _(this.feats)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(feat => ({
          ...feat,
          id: feat.name,
          isExpandable: feat.text
        })).value()
    }

    get headers () {
      return [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Ability Score Increase',
          value: 'attributesIncreased',
          render: (value: string[]) => _.upperFirst(value ? value.join(' or ') : '-'),
          filterChoices: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'],
          filterFunction: ({ attributesIncreased }: FeatType, filterValue: string) => _.includes(attributesIncreased, filterValue)
        },
        {
          text: 'Prerequisite',
          value: 'prerequisite'
        },
        {
          text: 'Source',
          value: 'contentType',
          render: _.startCase,
          filterChoices: ['Core', 'Expanded Content'],
          filterFunction: ({ contentType }: FeatType, filterValue: string) => _.startCase(contentType) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Feats
    br
    SearchTable(v-bind="{ headers, items, initialSearch }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.text")
</template>
