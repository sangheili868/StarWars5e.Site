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
  export default class ReferenceFeats extends Vue {
    @archetypeModule.State feats!: FeatType[]
    @archetypeModule.Action fetchFeats!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean

    created () {
      this.fetchFeats()
    }

    get items () {
      const page = this.isInHandbook ? 'handbook' : 'reference'
      return _(this.feats)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Base')
        .map(feat => ({
          ...feat,
          id: feat.name
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Prerequisite', value: 'prerequisite' },
        { text: 'Source', value: 'contentType', render: _.startCase }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Feats
    br
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        VueMarkdown {{ props.item.text }}
</template>
