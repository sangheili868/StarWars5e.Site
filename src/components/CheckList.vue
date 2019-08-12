<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { range } from 'lodash'

  @Component
  export default class CheckList extends Vue {
    @Prop(String) readonly title!: string
    @Prop(Number) readonly current!: number
    @Prop(Number) readonly maximum!: number
    range = range
  }
</script>

<template lang="pug">
  div {{ title }}: {{ current }}/{{ maximum }}
</template>
