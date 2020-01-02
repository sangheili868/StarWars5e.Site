<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { AbilityScoreType } from '@/types/completeCharacterTypes'
  import { TweaksType } from '@/types/rawCharacterTypes'
  import addPlus from '@/utilities/addPlus'
  import { startCase, upperCase } from 'lodash'
  import ProficiencyDots from '@/components/ProficiencyDots.vue'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'

  @Component({
    components: {
      CharacterSheetModifier,
      CharacterSheetTweaker,
      ProficiencyDots
    }
  })
  export default class CharacterSheetAbilities extends Vue {
    @Prop(Object) readonly abilityScores!: AbilityScoreType
    @Prop(Object) readonly tweaks!: TweaksType

    addPlus = addPlus
    startCase = startCase
  }
</script>

<template lang="pug">
  div.d-flex.flex-wrap
    div(
      v-for="({ value, modifier, savingThrow, skills }, ability) in abilityScores",
      :key="ability"
      :class="$style.ability",
    ).flex-grow-1
      CharacterSheetTweaker(
        v-bind="{ value, tweaks }",
        :title="ability + ' Score'"
        :tweakPath="`abilityScores.${ability}.score`",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
        div.d-flex
          h2(:class="$style.modifier").pr-2 {{ addPlus(modifier) }}
          h3.flex-grow-1 {{ ability }}
      div.d-flex.px-1.pb-1
        h5(:class="$style.modifier") {{ value }}
        div
          CharacterSheetTweaker(
            :value="savingThrow.modifier",
            :title="ability + 'Saving Throw'",
            :tweaks="tweaks",
            :tweakPath="`abilityScores.${ability}.savingThrowModifier`",
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
          )
            ProficiencyDots(:proficiency="savingThrow.proficiency")
              h4(:class="$style.modifier").mr-1.text-center {{ addPlus(savingThrow.modifier) }}
              h4 Saving Throw
          CharacterSheetTweaker(
            v-for="{ name, proficiency, modifier } in skills",
            :key="name",
            :value="modifier",
            :title="name",
            :tweaks="tweaks",
            :tweakPath="`abilityScores.${ability}.skills.${name}`",
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
          )
            ProficiencyDots(v-bind="{ proficiency }")
              div(:class="$style.modifier").mr-1.text-center {{ addPlus(modifier) }}
              div {{ name }}
</template>

<style module lang="scss">
  .ability {
    min-width: 211px;

    .modifier {
      min-width: 25px;
    }
  }
</style>
