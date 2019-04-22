<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { PowerType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const powersModule = namespace('powers')

  @Component({
    components: {
      SearchTable,
      VueMarkdown
    }
  })
  export default class ReferenceForcePowers extends Vue {
    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void

    created () {
      this.fetchPowers()
    }

    get items () {
      return _(this.powers)
        .filter(({ powerType }) => powerType === 'Tech')
        .map(powers => ({
          ...powers,
          to: `/reference/powers/${powers.name}`,
          id: powers.name
        })).value()
    }

    get headers () {
      return [
        { text: 'Level', value: 'level', render: (value: string) => value || 'At-will' },
        { text: 'Name', value: 'name' },
        { text: 'Casting Period', value: 'castingPeriodText' },
        { text: 'Range', value: 'range' },
        { text: 'Duration', value: 'duration', render: _.upperFirst },
        { text: 'Concentration', value: 'concentration', render: (value: boolean) => value ? 'Concentration' : '-' }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Tech Powers
    br
    SearchTable(v-bind="{ headers, items }", isExpandable)
      template(v-slot:default="props")
        VueMarkdown {{ props.item.description }}
</template>
