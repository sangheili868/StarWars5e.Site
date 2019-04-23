<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { BackgroundType } from '@/types'
  import _ from 'lodash'

  const backgroundModule = namespace('backgrounds')

  @Component({
    components: {
      SearchTable
    }
  })
  export default class ReferenceBackgrounds extends Vue {
    @backgroundModule.State backgrounds!: BackgroundType[]
    @backgroundModule.Action fetchBackgrounds!: () => void
    @Prop({ type: Boolean, default: false }) readonly isInHandbook!: boolean

    created () {
      this.fetchBackgrounds()
    }

    get items () {
      const page = this.isInHandbook ? 'handbook' : 'reference'
      return _(this.backgrounds)
        .filter(({ contentType }) => !this.isInHandbook || contentType === 'Base')
        .map(background => ({
          ...background,
          to: `/${page}/backgrounds/${background.name}`
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Feature', value: 'featureName' },
        { text: 'Source', value: 'contentType', render: _.startCase }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1(v-if="!isInHandbook") Backgrounds
    br
    SearchTable(v-bind="{ headers, items }")
</template>
