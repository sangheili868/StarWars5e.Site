<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { BackgroundType } from '@/types/characterTypes'
  import _ from 'lodash'
  import BackButton from '@/components/BackButton.vue'

  const backgroundModule = namespace('backgrounds')

  const skills = [
    'Athletics',
    'Acrobatics',
    'Sleight of Hand',
    'Stealth',
    'Investigation',
    'Lore',
    'Nature',
    'Piloting',
    'Technology',
    'Animal Handling',
    'Insight',
    'Medicine',
    'Perception',
    'Survival',
    'Deception',
    'Intimidation',
    'Performance',
    'Persuasion'
  ]

  @Component({
    components: {
      BackButton,
      SearchTable
    }
  })
  export default class CharactersBackgrounds extends Vue {
    @backgroundModule.State backgrounds!: BackgroundType[]
    @backgroundModule.Action fetchBackgrounds!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Backgrounds'

    created () {
      this.fetchBackgrounds()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'handbook' : 'characters'
      return _(this.backgrounds)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(background => ({
          ...background,
          to: `/${page}/backgrounds/${background.name}`
        })).value()
    }

    get headers () {
      return [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Skill Proficiency',
          value: 'skillProficiencies',
          isMultiSelect: true,
          filterChoices: skills,
          filterFunction: ({ skillProficiencies }: BackgroundType, filterValue: string[]) =>
            filterValue.every(skill => skillProficiencies.includes(skill))
        },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC'],
          filterFunction: ({ contentSource }: BackgroundType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Backgrounds
    br
    SearchTable(name="Backgrounds", v-bind="{ headers, items, initialSearch, tableType }")
</template>
