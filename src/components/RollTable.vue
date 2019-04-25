<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { RollTableRowType } from '@/types'

  @Component
  export default class RollTable extends Vue {
    @Prop(Array) readonly items!: RollTableRowType[]
    @Prop(String) readonly title!: string
    @Prop(Boolean) readonly isLeftAlign!: boolean
  }
</script>

<template lang="pug">
  table(v-if="items && items.length").table.text-xs-center
    thead
      tr
        th.px-2.py-1 d{{ items.length }}
        th(:class="{ 'text-xs-left': isLeftAlign }").px-2.py-1 {{ title }}
    tbody
      tr(v-for="{name, roll} in items", :key="roll").rows
        td.px-2.py-1 {{ roll }}
        td(:class="{ 'text-xs-left': isLeftAlign }").px-2.py-1 {{ name }}
</template>
