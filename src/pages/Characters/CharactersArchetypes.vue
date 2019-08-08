<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { ArchetypeType } from '@/types'
  import _ from 'lodash'

  const archetypeModule = namespace('archetypes')

  @Component({
    components: {
      SearchTable
    }
  })
  export default class CharactersArchetypes extends Vue {
    @archetypeModule.State archetypes!: ArchetypeType[]
    @archetypeModule.Action fetchArchetypes!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean

    created () {
      this.fetchArchetypes()
    }

    get items () {
      const page = this.isInHandbook ? 'handbook' : 'characters'
      return _(this.archetypes)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(archetype => ({
          ...archetype,
          to: `/${page}/archetypes/${archetype.name}`
        })).value()
    }

    get headers () {
      return [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Class',
          value: 'className',
          filterChoices: ['Berserker', 'Consular', 'Engineer', 'Fighter', 'Guardian', 'Monk', 'Operative', 'Scholar', 'Scout', 'Sentinel'],
          filterFunction: ({ className }: ArchetypeType, filterValue: string) => className === filterValue
        },
        {
          text: 'Source',
          value: 'contentType',
          render: _.startCase,
          filterChoices: ['Core', 'Expanded Content'],
          filterFunction: ({ contentType }: ArchetypeType, filterValue: string) => _.startCase(contentType) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Archetypes
    br
    SearchTable(v-bind="{ headers, items }")
</template>
