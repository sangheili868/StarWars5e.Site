<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CharacteristicsType, FeatureType } from '@/types/completeCharacterTypes'
  import { startCase } from 'lodash'
  import CharacterSheetFeatures from './CharacterSheetFeatures.vue'

  @Component({
    components: {
      CharacterSheetFeatures
    }
  })
  export default class CharacterSheetProficiencies extends Vue {
    @Prop(String) readonly alignment!: string
    @Prop(String) readonly background!: string
    @Prop(Array) readonly proficiencies!: string[]
    @Prop(Array) readonly languages!: string[]
    @Prop(Object) readonly characteristics!: CharacteristicsType
    @Prop(Array) readonly otherFeatures!: FeatureType[]
    startCase = startCase
  }
</script>

<template lang="pug">
  div
    h3 Non-combat Features
    CharacterSheetFeatures(:features="otherFeatures")
    h3 Langauges
    div(v-for="language in languages", :key="language").caption {{ language }}
    h3 Proficiencies
    div(v-for="proficiency in proficiencies", :key="proficiency").caption {{ proficiency }}
</template>
