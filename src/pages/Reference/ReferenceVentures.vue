<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { VentureType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const venturesModule = namespace('ventures')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class ReferenceVentures extends Vue {
    @venturesModule.State ventures!: VentureType[]
    @venturesModule.Action fetchVentures!: () => void

    created () {
      this.fetchVentures()
    }

    get items () {
      return _(this.ventures)
        .map(ventures => ({
          ...ventures,
          id: ventures.name
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Prerequisites',
          value: 'prerequisites',
          render: (prerequisites: string[]) => _.upperFirst(prerequisites.join(', ') || '---')
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Ventures
    br
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        VueMarkdown {{ props.item.content }}
</template>
