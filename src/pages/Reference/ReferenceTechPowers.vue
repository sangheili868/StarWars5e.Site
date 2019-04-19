<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { PowerType } from '@/types'
  import _ from 'lodash'

  const powersModule = namespace('powers')

  @Component({
    components: {
      SearchTable
    }
  })
  export default class ReferenceForcePowers extends Vue {
    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean

    created () {
      this.fetchPowers()
    }

    get items () {
      return _(this.powers)
        .filter(({ powerType }) => powerType === 'Tech')
        .map(powers => ({
          ...powers,
          to: `/reference/powers/${powers.name}`
        })).value()
    }

    get headers () {
      return [
        { text: 'Level', value: 'level' },
        { text: 'Name', value: 'name' },
        { text: 'Casting Period', value: 'castingPeriodText' },
        { text: 'Concentration', value: 'concentration' },
        { text: 'Duration', value: 'duration' },
        { text: 'Range', value: 'range' },
        { text: 'Prerequisite', value: 'prerequisite' }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Tech Powers
    br
    SearchTable(v-bind="{ headers, items }")
</template>
