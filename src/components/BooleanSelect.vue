<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class BooleanSelect extends Vue {
    @Prop(Boolean) readonly value!: boolean
    @Prop(String) readonly trueValue!: String
    @Prop(String) readonly falseValue!: String
  }
</script>

<template lang="pug">
  v-select(
    :value="value ? trueValue : falseValue",
    :items="[trueValue, falseValue]",
    v-bind="$attrs",
    @input="selected => $emit('input', selected === trueValue)"
  )
</template>
