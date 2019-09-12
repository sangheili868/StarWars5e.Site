<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import rawCharacter from '@/test/senyaRaw.json'
  import generateCharacter from '../CharacterEngine/generateCharacter'
  import { range } from 'lodash'

  @Component({
    components: {
      CharacterSheetTop,
      CharacterSheetSection
    }
  })
  export default class CharacterSheet extends Vue {
    range = range
    openTabs: number[] = [0, 1, 2]

    get numSections () {
      return ({
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3
      } as { [ breakpoint: string ] : number })[this.$vuetify.breakpoint.name]
    }

    get completeCharacter () {
      return generateCharacter(rawCharacter)
    }
  }
</script>

<template lang="pug">
  div
    CharacterSheetTop(v-bind="{ completeCharacter }").mx-2
    v-layout(justify-space-around)
      v-flex(v-for="section in range(numSections)", :key="section", md4, sm6, xs12)
        CharacterSheetSection(v-bind="{ completeCharacter }", :currentTab="openTabs[section]")
</template>
