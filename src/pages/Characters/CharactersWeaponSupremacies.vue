<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { WeaponSupremacyType } from '@/types/characterTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const weaponSupremacyModule = namespace('weaponSupremacies')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class CharactersWeaponSupremacies extends Vue {
    @weaponSupremacyModule.State weaponSupremacies!: WeaponSupremacyType[]
    @weaponSupremacyModule.Action fetchWeaponSupremacies!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Weapon Supremacies'

    created () {
      this.fetchWeaponSupremacies()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'phb' : 'characters'
      return _(this.weaponSupremacies)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(weaponSupremacy => ({
          ...weaponSupremacy,
          id: weaponSupremacy.name,
          isExpandable: weaponSupremacy.description
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
          filterFunction: ({ contentSource }: WeaponSupremacyType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Weapon Supremacies
    br
    SearchTable(name="WeaponSupremacies", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
