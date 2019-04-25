<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { StarshipModificationType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const starshipModificationsModule = namespace('starshipModifications')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class ReferenceStarshipModifications extends Vue {
    @starshipModificationsModule.State starshipModifications!: StarshipModificationType[]
    @starshipModificationsModule.Action fetchStarshipModifications!: () => void

    created () {
      this.fetchStarshipModifications()
    }

    get items () {
      return _(this.starshipModifications)
        .map(starshipModifications => ({
          ...starshipModifications,
          id: starshipModifications.name
        })).value()
    }

    get headers () {
      return [
        { text: 'Type', value: 'type' },
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
    h1 Starship Modifications
    br
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        VueMarkdown {{ props.item.content }}
</template>
