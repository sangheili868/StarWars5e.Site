<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { FightingMasteryType } from '@/types/characterTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const fightingMasteryModule = namespace('fightingMasteries')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class CharactersFightingMasteries extends Vue {
    @fightingMasteryModule.State fightingMasteries!: FightingMasteryType[]
    @fightingMasteryModule.Action fetchFightingMasteries!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Fighting Masteries'

    created () {
      this.fetchFightingMasteries()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'phb' : 'characters'
      return _(this.fightingMasteries)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(fightingMastery => ({
          ...fightingMastery,
          id: fightingMastery.name,
          isExpandable: fightingMastery.text
        })).value()
    }

    get headers () {
      return [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC', 'WH'],
          filterFunction: ({ contentSource }: FightingMasteryType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Fighting Masteries
      v-btn(color="primary", to="/rules/phb/customization#fighting-masteries", target="_blank").mx-2.my-2 Fighting Masteries Rules
    br
    SearchTable(name="FightingMasteries", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.text")
</template>
