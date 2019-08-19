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
  export default class StarshipsVentures extends Vue {
    @venturesModule.State ventures!: VentureType[]
    @venturesModule.Action fetchVentures!: () => void
    initialSearch: string | (string | null)[] = ''

    created () {
      this.fetchVentures()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.ventures)
        .map(venture => ({
          ...venture,
          id: venture.name,
          isExpandable: venture.content
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Prerequisites',
          value: 'prerequisites',
          render: (prerequisites: string[]) => _.upperFirst(prerequisites.join(', ') || '-')
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Ventures
    br
    SearchTable(v-bind="{ headers, items, initialSearch }")
      template(v-slot:default="props")
        VueMarkdown(:source="props.item.content")
</template>
