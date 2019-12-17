
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { chain } from 'lodash'
  import isMobile from 'ismobilejs'

  @Component
  export default class MySelect extends Vue {
    get isMobile () {
      return isMobile(navigator.userAgent).any
    }

    get events () {
      return chain([ 'input', 'change' ])
        .keyBy()
        .mapValues(event => (payload: any) => this.$emit(event, payload))
        .value()
    }
  }
</script>

<template lang="pug">
  v-select(v-if="isMobile", v-bind="$attrs", v-on="events")
  v-autocomplete(v-else, v-bind="$attrs", v-on="events")
</template>
