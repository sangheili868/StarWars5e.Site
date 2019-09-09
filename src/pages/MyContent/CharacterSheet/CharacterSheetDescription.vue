<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CharacteristicsType } from '@/types'
  import { startCase } from 'lodash'

  @Component
  export default class CharacterSheetDescription extends Vue {
    @Prop(String) readonly alignment!: string
    @Prop(String) readonly background!: string
    @Prop(Array) readonly proficiencies!: string[]
    @Prop(Array) readonly languages!: string[]
    @Prop(Object) readonly characteristics!: CharacteristicsType
    startCase = startCase
  }
</script>

<template lang="pug">
  div.text-xs-left
    h3 Description
    div #[strong Alignment]: {{ alignment }}
    div #[strong Background]: {{ background }}
    div(
      v-for="(value, characteristic) in characteristics",
      :key="characteristic"
    ).caption #[strong {{ startCase(characteristic) }}]: {{ value}}
</template>
