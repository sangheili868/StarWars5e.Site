<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import { AbilityScoreType } from '@/types'
  import addPlus from '@/utilities/addPlus'
  import { startCase, upperCase } from 'lodash'
  import ProficiencyDots from '@/components/ProficiencyDots.vue'

  @Component({
    components: {
      CharacterSheetSection,
      ProficiencyDots
    }
  })
  export default class CharacterSheetAbilities extends Vue {
    @Prop(Object) readonly abilityScores!: AbilityScoreType
    addPlus = addPlus
    startCase = startCase
  }
</script>

<template lang="pug">
  CharacterSheetSection
    div(
      v-for="({ value, modifier, savingThrow, skills }, ability) in abilityScores",
      :key="ability",
      :class="$style.ability"
    ).mb-2
      div(:class="$style.values").mr-3
        h2 {{ addPlus(modifier) }}
        h5 {{ value }}
      div.text-xs-left
        h3 {{ ability }}
        div
          ProficiencyDots(:proficiency="savingThrow.proficiency") {{ addPlus(savingThrow.modifier) }} Saving Throw
          ProficiencyDots(
            v-for="{ name, proficiency, modifier } in skills",
            :key="name",
            v-bind="{ proficiency }"
          ) {{ addPlus(modifier) }} {{ name }}
</template>
