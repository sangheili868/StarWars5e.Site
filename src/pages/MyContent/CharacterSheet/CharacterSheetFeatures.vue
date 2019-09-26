<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompletedFeatureType } from '@/types/completeCharacterTypes'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'

  @Component({
    components: {
      CharacterSheetExpansionFeatures
    }
  })
  export default class CharacterSheetFeatures extends Vue {
    @Prop(Array) readonly features!: CompletedFeatureType[]
  }
</script>

<template lang="pug">
    CharacterSheetExpansionFeatures(v-bind="{ features }")
</template>
