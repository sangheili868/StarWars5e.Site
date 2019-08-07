<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { BackgroundType } from '@/types'
  import _ from 'lodash'

  const backgroundModule = namespace('backgrounds')

  @Component({
    components: {
      SearchTable
    }
  })
  export default class CharactersBackgrounds extends Vue {
    @backgroundModule.State backgrounds!: BackgroundType[]
    @backgroundModule.Action fetchBackgrounds!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean

    created () {
      this.fetchBackgrounds()
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
          text: 'Feature',
          value: 'skillProficiencies',
          filterChoices: ['Deception', 'Lore'],
          filterFunction: ({ skillProficiencies }: BackgroundType, filterValue: string) => _.includes(skillProficiencies, filterValue)
        },
        {
          text: 'Source',
          value: 'contentType',
          render: _.startCase,
          filterChoices: ['Core', 'Expanded Content'],
          filterFunction: ({ contentType }: BackgroundType, filterValue: string) => _.startCase(contentType) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Backgrounds
    br
    SearchTable(v-bind="{ headers, items }")
</template>
