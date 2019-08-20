<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import characterJson from '@/test/senyaComplete'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetSection from './CharacterSheetSection.vue'

  @Component({
    components: {
      CharacterSheetTop,
      CharacterSheetSection
    }
  })
  export default class CharacterSheet extends Vue {
    completeCharacter = characterJson
  }
</script>

<template lang="pug">
  div
    CharacterSheetTop(v-bind="{ completeCharacter }").mx-2
    v-layout(justify-space-around)
      v-flex(sm-4)
        CharacterSheetSection(v-bind="{ completeCharacter }")
      v-flex(sm-4)
        CharacterSheetSection(v-bind="{ completeCharacter }")
      v-flex(sm-4)
        CharacterSheetSection(v-bind="{ completeCharacter }")
</template>
