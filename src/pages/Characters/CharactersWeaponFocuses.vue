<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { WeaponFocusType } from '@/types/characterTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const weaponFocusModule = namespace('weaponFocuses')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class CharactersWeaponFocuses extends Vue {
    @weaponFocusModule.State weaponFocuses!: WeaponFocusType[]
    @weaponFocusModule.Action fetchWeaponFocuses!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Weapon Focuses'

    created () {
      this.fetchWeaponFocuses()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'phb' : 'characters'
      return _(this.weaponFocuses)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(weaponFocus => ({
          ...weaponFocus,
          id: weaponFocus.name,
          isExpandable: weaponFocus.description
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
          filterFunction: ({ contentSource }: WeaponFocusType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Weapon Focuses
    br
    SearchTable(name="WeaponFocuses", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
