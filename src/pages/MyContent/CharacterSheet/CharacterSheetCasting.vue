<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { TechCastingType, ForceCastingType } from '@/types/completeCharacterTypes'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import CharacterSheetCastingAddPower from './CharacterSheetCastingAddPower.vue'
  import { groupBy } from 'lodash'
  import CharacterSheetTicker from './CharacterSheetTicker.vue'
  import CheckList from '@/components/CheckList.vue'

  @Component({
    components: {
      CheckList,
      CharacterSheetModifier,
      CharacterSheetTweaker,
      CharacterSheetExpansionFeatures,
      CharacterSheetTicker,
      CharacterSheetCastingAddPower
    }
  })
  export default class CharacterSheetCasting extends Vue {
    @Prop({ type: [ Boolean, Object ] }) readonly techCasting!: false | TechCastingType
    @Prop({ type: [ Boolean, Object ] }) readonly forceCasting!: false | ForceCastingType
    @Prop(Array) readonly customTechPowers!: string[]
    @Prop(Array) readonly customForcePowers!: string[]

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
    div.d-flex.justify-space-between.align-center
      h2 Tech Casting
      CharacterSheetCastingAddPower(
        icon,
        castingType="Tech",
        :powersSelected="customTechPowers"
        @updatePowers="newPowers => $emit('replaceCharacterProperty', { path: 'customTechPowers', property: newPowers })"
      )
    div(v-if="techCasting").mb-3
      div.d-flex.align-center
        CharacterSheetTweaker(
          title="Number of Tech Points",
          :tweakPaths="[{ name: 'Number of Tech Points', path: 'techCasting.maxPoints' }]",
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
        tweakPath="techCasting.attackModifier",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="techCasting.saveDC",
        label="Tech Save DC",
        tweakPath="techCasting.saveDC",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="techCasting.maxPowerLevel",
        label="Max Power Level",
        ordinal,
        tweakPath="techCasting.maxPowerLevel",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      div(v-for="(powers, level) in groupBy(techCasting.powersKnown, 'level')", :key="level")
        h3.mt-2 {{ powerLevelText(level) }}
        CharacterSheetExpansionFeatures(:features="powers")
      div(v-if="techCasting.powersKnown.length <= 0").mt-5
        div Click Edit Character above to choose tech powers
    div.d-flex.justify-space-between.align-center
      h2 Force Casting
      CharacterSheetCastingAddPower(
        icon,
        castingType="Force",
        :powersSelected="customForcePowers"
        @updatePowers="newPowers => $emit('replaceCharacterProperty', { path: 'customForcePowers', property: newPowers })"
      )
    div(v-if="forceCasting")
      div.d-flex.align-center
        CharacterSheetTweaker(
          title="Number of Force Points",
          :tweakPaths="[{ name: 'Number of Force Points', path: 'forceCasting.maxPoints' }]",
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
        tweakPath="forceCasting.lightAttackModifier",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.lightSaveDC",
        label="Light Save DC",
        tweakPath="forceCasting.lightSaveDC",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.darkAttackModifier",
        addPlus,
        label="Dark Attack Modifier",
        tweakPath="forceCasting.darkAttackModifier",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.darkSaveDC",
        label="Dark Save DC",
        tweakPath="forceCasting.darkSaveDC",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.universalAttackModifier",
        addPlus,
        label="Universal Attack Modifier",
        tweakPath="forceCasting.universalAttackModifier",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.universalSaveDC",
        label="Universal Save DC",
        tweakPath="forceCasting.universalSaveDC",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      CharacterSheetModifier(
        :value="forceCasting.maxPowerLevel",
        label="Max Power Level",
        ordinal,
        tweakPath="forceCasting.maxPowerLevel",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      div(v-for="(powers, level) in groupBy(forceCasting.powersKnown, 'level')", :key="level")
        h3.mt-2 {{ powerLevelText(level) }}
        CharacterSheetExpansionFeatures(:features="powers")
      div(v-if="forceCasting.powersKnown.length <= 0").mt-3
        v-btn(color="primary", @click="$emit('goToStep', 2)") Choose Powers
</template>
