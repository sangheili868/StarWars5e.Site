<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { range } from 'lodash'

  @Component
  export default class CheckList extends Vue {
    @Prop(String) readonly title!: string
    @Prop(Number) readonly current!: number
    @Prop(Number) readonly blocked!: number
    @Prop(Number) readonly maximum!: number

    range = range

    increment (index: number, isChecked: boolean) {
      this.$emit('changeSelected', isChecked ? index + 1 : index)
    }
  }
</script>

<template lang="pug">
  div.d-flex.align-center
    slot
    h4.mr-2 {{ title }}
    div.d-flex.align-center.justify-start.flex-wrap
      v-checkbox(
        v-for="index in range(maximum)",
        :key="index",
        color="primary",
        hide-details,
        :indeterminate="index >= maximum - blocked",
        :readonly="index >= maximum - blocked",
        :input-value="current > index",
        @change="isChecked => increment(index, isChecked)"
      ).pt-0.mt-0
</template>
