<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import { CharacteristicsType } from '@/types'
  import { startCase } from 'lodash'

  @Component({
    components: {
      CharacterSheetSection
    }
  })
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
  CharacterSheetSection.text-xs-left
    div #[strong Alignment]: {{ alignment }}
    div #[strong Background]: {{ background }}
    h3 Proficiencies
    div(v-for="proficiency in proficiencies", :key="proficiency").caption {{ proficiency }}
    h3 Langauges
    div(v-for="language in languages", :key="language").caption {{ language }}
    br
    div(
      v-for="(value, characteristic) in characteristics",
      :key="characteristic"
    ).caption #[strong {{ startCase(characteristic) }}]: {{ value}}
</template>
