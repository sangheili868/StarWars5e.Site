<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { range } from 'lodash'

  @Component
  export default class CheckList extends Vue {
    @Prop(String) readonly title!: string
    @Prop(Number) readonly current!: number
    @Prop(Number) readonly maximum!: number
    @Prop(Boolean) readonly isStateful!: boolean

    range = range

    statefulNumSelected = 0

    get numSelected () {
      return this.isStateful ? this.statefulNumSelected : this.current
    }

    increment (index: number, state: boolean) {
      this.statefulNumSelected = state ? index + 1 : index
      this.$emit('changeSelected', state ? index + 1 : index)
    }
  }
</script>

<template lang="pug">
  v-layout(align-center)
    h4.mr-2 {{ title }}
    v-layout(justify-start, wrap)
      v-checkbox(
        v-for="index in range(maximum)",
        :key="index",
        color="primary",
        hide-details,
        :class="$style.checkbox",
        :indeterminate="isStateful && current <= index",
        :readonly="isStateful"
        :input-value="numSelected > index",
        @change="state => increment(index, state)"
      )
</template>

<style lang="scss" module>
  .checkbox {
    flex: none !important;
    margin-top: 0 !important;
  }
</style>
