<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { FeatType } from '@/types/characterTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const archetypeModule = namespace('feats')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class CharactersFeats extends Vue {
    @archetypeModule.State feats!: FeatType[]
    @archetypeModule.Action fetchFeats!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Feats'

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
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC'],
          filterFunction: ({ contentSource }: FeatType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Feats
    br
    SearchTable(name="Feats", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.text")
</template>
