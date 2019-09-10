<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { FeatureType } from '@/types.ts'
  import CharacterSheetCastingPower from './CharacterSheetCastingPower.vue'

  @Component({
    components: {
      CharacterSheetCastingPower
    }
  })
  export default class CharacterSheetFeatures extends Vue {
    @Prop(Array) readonly features!: FeatureType[]
  }
</script>

<template lang="pug">
  v-expansion-panel
    CharacterSheetCastingPower(
      v-for="feature in features",
      :key="feature.name",
      :power="feature"
    )
</template>

<style module lang="scss">

</style>
