<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { LightsaberFormType } from '@/types/characterTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import BackButton from '@/components/BackButton.vue'

  const lightsaberFormsModule = namespace('lightsaberForms')

  @Component({
    components: {
      SearchTable,
      BackButton,
      VueMarkdown
    }
  })
  export default class CharacterslightsaberForms extends Vue {
    @lightsaberFormsModule.State lightsaberForms!: LightsaberFormType[]
    @lightsaberFormsModule.Action fetchLightsaberForms!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Lightsaber Forms'

    created () {
      this.fetchLightsaberForms()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      const page = this.isInHandbook ? 'phb' : 'characters'
      return _(this.lightsaberForms)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Core')
        .map(lightsaberForm => ({
          ...lightsaberForm,
          id: lightsaberForm.name,
          isExpandable: lightsaberForm.description
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
          filterFunction: ({ contentSource }: LightsaberFormType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    template(v-if="!isInHandbook")
      BackButton
      h1 Lightsaber Forms
    br
    SearchTable(name="LightsaberForms", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.description")
</template>
