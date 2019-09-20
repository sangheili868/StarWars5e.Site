<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CharacteristicsType, CompletedFeatureType } from '@/types/completeCharacterTypes'
  import { capitalize } from 'lodash'
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
    @Prop(Array) readonly nonCombatFeatures!: CompletedFeatureType[]

    startCase (input: string) {
      // Lodash's start case removes apostrophes, so we need a custom function to handle things like Biochemist's Kit
      return input.replace(/\w+/g, capitalize).replace("'S", "'s")
    }
  }
</script>

<template lang="pug">
  div
    h3 Non-combat Features
    CharacterSheetFeatures(:features="nonCombatFeatures")
    h3 Langauges
    div(v-for="language in languages", :key="language").caption {{ language }}
    h3 Proficiencies
    div(v-for="proficiency in proficiencies", :key="proficiency").caption {{ startCase(proficiency) }}
</template>
