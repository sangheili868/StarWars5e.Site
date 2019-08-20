<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CharacteristicsType } from '@/types'
  import { startCase } from 'lodash'

  @Component
  export default class CharacterSheetwProficienciesescription extends Vue {
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
    h3 Proficiencies
    div(v-for="proficiency in proficiencies", :key="proficiency").caption {{ proficiency }}
    h3 Langauges
    div(v-for="language in languages", :key="language").caption {{ language }}
</template>
