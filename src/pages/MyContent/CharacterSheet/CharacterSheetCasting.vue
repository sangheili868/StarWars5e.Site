<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { TechCastingType, ForceCastingType } from '@/types/completeCharacterTypes'
  import { TweaksType } from '@/types/rawCharacterTypes'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import { groupBy } from 'lodash'
  import CharacterSheetTicker from './CharacterSheetTicker.vue'
  import CheckList from '@/components/CheckList.vue'

  @Component({
    components: {
      CheckList,
      CharacterSheetModifier,
      CharacterSheetTweaker,
      CharacterSheetExpansionFeatures,
      CharacterSheetTicker
    }
  })
  export default class CharacterSheetCasting extends Vue {
    @Prop({ type: [ Boolean, Object ] }) readonly techCasting!: false | TechCastingType
    @Prop({ type: [ Boolean, Object ] }) readonly forceCasting!: false | ForceCastingType
    @Prop(Object) readonly tweaks!: TweaksType
    groupBy = groupBy

    powerLevelText (level: number) {
      return level > 0 ? `Level ${level}` : 'At-will'
    }

    handleChangeTechPoints (techPointsUsed: number) {
      this.$emit('updateCharacter', { currentStats: { techPointsUsed } })
    }

    handleChangeForcePoints (forcePointsUsed: number) {
      this.$emit('updateCharacter', { currentStats: { forcePointsUsed } })
    }
  }
</script>

<template lang="pug">
  div
    div(v-if="techCasting").mb-3
      h2 Tech Casting
      div.d-flex.align-center
        CharacterSheetTweaker(
          title="Number of Tech Points",
          :value="techCasting.maxPoints",
          :tweaks="tweaks",
          tweakPath="techCasting.maxPoints",
          @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
        )
          h4 Tech Points
        CharacterSheetTicker(
          v-if="techCasting.maxPoints > 10",
          :current="Math.max(0, techCasting.maxPoints - techCasting.pointsUsed)",
          :max="techCasting.maxPoints",
          @changeCount="currentPoints => handleChangeTechPoints(Math.max(0, techCasting.maxPoints - currentPoints))"
        )
        CheckList(
          v-else,
          :current="techCasting.pointsUsed",
          :maximum="techCasting.maxPoints",
          @changeSelected="handleChangeTechPoints"
        )
      CharacterSheetModifier(
        :value="techCasting.attackModifier",
        addPlus,
        label="Tech Attack Modifier",
        :tweaks="tweaks",
        tweakPath="techCasting.attackModifier",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="techCasting.saveDC",
        label="Tech Save DC",
        :tweaks="tweaks",
        tweakPath="techCasting.saveDC",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="techCasting.maxPowerLevel",
        label="Max Power Level",
        ordinal,
        :tweaks="tweaks",
        tweakPath="techCasting.maxPowerLevel",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      div(v-for="(powers, level) in groupBy(techCasting.powersKnown, 'level')", :key="level")
        h3.mt-2 {{ powerLevelText(level) }}
        CharacterSheetExpansionFeatures(:features="powers")
      div(v-if="techCasting.powersKnown.length <= 0").mt-5
        div Click Edit Character above to choose tech powers
    div(v-if="forceCasting")
      h2 Force Casting
      div.d-flex.align-center
        CharacterSheetTweaker(
          title="Number of Force Points",
          :value="forceCasting.maxPoints",
          :tweaks="tweaks",
          tweakPath="forceCasting.maxPoints",
          @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
        )
          h4 Force Points
        CharacterSheetTicker(
          v-if="forceCasting.maxPoints > 10",
          :current="Math.max(0, forceCasting.maxPoints - forceCasting.pointsUsed)",
          :max="forceCasting.maxPoints",
          @changeCount="currentPoints => handleChangeForcePoints(Math.max(0, forceCasting.maxPoints - currentPoints))"
        )
        CheckList(
          v-else,
          :current="forceCasting.pointsUsed",
          :maximum="forceCasting.maxPoints",
          @changeSelected="handleChangeForcePoints"
        )
      CharacterSheetModifier(
        :value="forceCasting.lightAttackModifier",
        addPlus,
        label="Light Attack Modifier",
        :tweaks="tweaks",
        tweakPath="forceCasting.lightAttackModifier",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.lightSaveDC",
        label="Light Save DC",
        :tweaks="tweaks",
        tweakPath="forceCasting.lightSaveDC",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.darkAttackModifier",
        addPlus,
        label="Dark Attack Modifier",
        :tweaks="tweaks",
        tweakPath="forceCasting.darkAttackModifier",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.darkSaveDC",
        label="Dark Save DC",
        :tweaks="tweaks",
        tweakPath="forceCasting.darkSaveDC",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.universalAttackModifier",
        addPlus,
        label="Universal Attack Modifier",
        :tweaks="tweaks",
        tweakPath="forceCasting.universalAttackModifier",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.universalSaveDC",
        label="Universal Save DC",
        :tweaks="tweaks",
        tweakPath="forceCasting.universalSaveDC",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.maxPowerLevel",
        label="Max Power Level",
        ordinal,
        :tweaks="tweaks",
        tweakPath="forceCasting.maxPowerLevel",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      div(v-for="(powers, level) in groupBy(forceCasting.powersKnown, 'level')", :key="level")
        h3.mt-2 {{ powerLevelText(level) }}
        CharacterSheetExpansionFeatures(:features="powers")
      div(v-if="forceCasting.powersKnown.length <= 0").mt-3
        v-btn(color="primary", @click="$emit('goToStep', 2)") Choose Powers
</template>
