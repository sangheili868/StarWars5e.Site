<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { FeatureType } from '@/types/completeCharacterTypes'
  import CharacterSheetExpansionFeature from './CharacterSheetExpansionFeature.vue'

  @Component({
    components: {
      CharacterSheetExpansionFeature
    }
  })
  export default class CharacterSheetFeatures extends Vue {
    @Prop(Array) readonly features!: FeatureType[]
  }
</script>

<template lang="pug">
  v-expansion-panel
    CharacterSheetExpansionFeature(
      v-for="feature in features",
      :key="feature.name",
      v-bind="{ feature }"
    )
</template>

<style module lang="scss">

</style>
