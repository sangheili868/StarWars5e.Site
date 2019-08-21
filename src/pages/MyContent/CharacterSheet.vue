<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import characterJson from '@/test/senyaComplete'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import { range } from 'lodash'

  @Component({
    components: {
      CharacterSheetTop,
      CharacterSheetSection
    }
  })
  export default class CharacterSheet extends Vue {
    completeCharacter = characterJson
    range = range

    get numSections () {
      return ({
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3
      } as { [ breakpoint: string ] : number })[this.$vuetify.breakpoint.name]
    }
  }
</script>

<template lang="pug">
  div
    CharacterSheetTop(v-bind="{ completeCharacter }").mx-2
    v-layout(justify-space-around)
      v-flex(v-for="count in range(numSections)")
        CharacterSheetSection(v-bind="{ completeCharacter }")
</template>
