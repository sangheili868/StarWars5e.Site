<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { range } from 'lodash'

  @Component
  export default class CheckList extends Vue {
    @Prop(String) readonly title!: string
    @Prop(Number) readonly current!: number
    @Prop(Number) readonly maximum!: number
    range = range

    numSelected = 0

    increment (index: number, state: boolean) {
      this.numSelected = state ? index + 1 : index
      this.$emit('changeSelected', this.numSelected)
    }
  }
</script>

<template lang="pug">
  div
    h3 {{ title }}
    v-layout(justify-start, wrap)
      v-checkbox(
        v-for="index in range(maximum)",
        :key="index",
        color="primary",
        hide-details,
        :class="$style.checkbox",
        :indeterminate="current <= index",
        :readonly="current < index",
        :value="numSelected > index",
        @change="state => increment(index, state)"
      )
</template>

<style lang="scss" module>
  .checkbox {
    flex: none !important;
  }
</style>
