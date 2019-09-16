<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ClassType } from '@/types/characterTypes'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import rawCharacter from '@/test/senyaRaw.json'
  import generateCharacter from '../CharacterEngine/generateCharacter'
  import { range } from 'lodash'

  const classesModule = namespace('classes')

  @Component({
    components: {
      CharacterSheetTop,
      CharacterSheetSection
    }
  })
  export default class CharacterSheet extends Vue {
    @classesModule.State classes!: ClassType[]
    @classesModule.Action fetchClasses!: () => void

    range = range
    openTabs: number[] = [0, 1, 2]

    created () {
      this.fetchClasses()
    }

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
      return generateCharacter(rawCharacter, this.classes)
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
