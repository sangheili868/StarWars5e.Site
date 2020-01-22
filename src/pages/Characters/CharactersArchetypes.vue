<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { ArchetypeType } from '@/types/characterTypes'
  import _ from 'lodash'
  import BackButton from '@/components/BackButton.vue'

  const archetypeModule = namespace('archetypes')

  @Component({
    components: {
      SearchTable,
      BackButton
    }
  })
  export default class CharactersArchetypes extends Vue {
    @archetypeModule.State archetypes!: ArchetypeType[]
    @archetypeModule.Action fetchArchetypes!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Archetypes'

    created () {
      this.fetchArchetypes()
      this.initialSearch = this.$route.query.search
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
          value: 'name',
          render: (name: string) => name.replace(/\ufffd/g, '-')
        },
        {
          text: 'Class',
          value: 'className',
          filterChoices: ['Berserker', 'Consular', 'Engineer', 'Fighter', 'Guardian', 'Monk', 'Operative', 'Scholar', 'Scout', 'Sentinel'],
          filterFunction: ({ className }: ArchetypeType, filterValue: string) => className === filterValue
        },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC'],
          filterFunction: ({ contentSource }: ArchetypeType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Archetypes
    br
    SearchTable(name="Archetypes", v-bind="{ headers, items, initialSearch, tableType }")
</template>
