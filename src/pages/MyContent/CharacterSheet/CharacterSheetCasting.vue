<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { TechCastingType, ForceCastingType } from '@/types/completeCharacterTypes'
  import { HighLevelCastingType } from '@/types/rawCharacterTypes'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import CharacterSheetCastingAddPower from './CharacterSheetCastingAddPower.vue'
  import { groupBy, startCase, filter, cloneDeep } from 'lodash'
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
    @Prop(Object) readonly highLevelCasting!: HighLevelCastingType
    @Prop(Array) readonly customTechPowers!: string[]
    @Prop(Array) readonly customForcePowers!: string[]

    groupBy = groupBy
    startCase = startCase

    get alignments () {
      if (!this.forceCasting) return []
      const hasLightPowers = this.forceCasting.powersKnown.some(power => power.forceAlignment === 'Light')
      const hasDarkPowers = this.forceCasting.powersKnown.some(power => power.forceAlignment === 'Dark')
      const hasUniversalPowers = this.forceCasting.powersKnown.some(power => power.forceAlignment === 'Universal') && (
        (hasLightPowers && hasDarkPowers) ||
        (!hasLightPowers && !hasDarkPowers) ||
        (hasLightPowers && !hasDarkPowers && this.forceCasting.universalSaveDC > this.forceCasting.lightSaveDC) ||
        (hasDarkPowers && !hasLightPowers && this.forceCasting.universalSaveDC > this.forceCasting.darkSaveDC)
      )
      return filter([hasLightPowers && 'light', hasUniversalPowers && 'universal', hasDarkPowers && 'dark'])
    }

    isDisabled (level: number, casting: TechCastingType | ForceCastingType) {
      const hasNotEnoughPoints = level >= casting.maxPoints - casting.pointsUsed
      const isAlreadyCastAtHighLevel = (this.highLevelCasting as unknown as { [level: string]: boolean | undefined })['level' + level]
      return hasNotEnoughPoints || isAlreadyCastAtHighLevel
    }

    powerLevelText (level: number) {
      return level > 0 ? `Level ${level}` : 'At-will'
    }

    handleChangeTechPoints (techPointsUsed: number, highLevelCasting: HighLevelCastingType) {
      this.$emit('updateCharacter', { currentStats: { techPointsUsed, highLevelCasting } })
    }

    handleChangeForcePoints (forcePointsUsed: number, highLevelCasting: HighLevelCastingType) {
      this.$emit('updateCharacter', { currentStats: { forcePointsUsed, highLevelCasting } })
    }

    castTechPower (powerLevel: string) {
      const highLevelCasting = cloneDeep(this.highLevelCasting)
      if (parseInt(powerLevel) > 5) {
        (highLevelCasting as unknown as { [level: string]: boolean | undefined })['level' + powerLevel] = true
      }
      if (this.techCasting) {
        this.handleChangeTechPoints(Math.min(
          this.techCasting.maxPoints,
          this.techCasting.pointsUsed + parseInt(powerLevel) + 1
        ), highLevelCasting)
      }
    }

    castForcePower (powerLevel: string) {
      const highLevelCasting = cloneDeep(this.highLevelCasting)
      if (parseInt(powerLevel) > 5) {
        (highLevelCasting as unknown as { [level: string]: boolean | undefined })['level' + powerLevel] = true
      }
      if (this.forceCasting) {
        this.handleChangeForcePoints(Math.min(
          this.forceCasting.maxPoints,
          this.forceCasting.pointsUsed + parseInt(powerLevel) + 1
        ), highLevelCasting)
      }
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
          div.d-flex
            h4 Tech Points
            div(v-if="techCasting.maxPoints === 0").caption.ml-3 None
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
        :value="techCasting.maxPowerLevel",
        label="Max Power Level",
        ordinal,
        tweakPath="techCasting.maxPowerLevel",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
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
      div(v-for="(powers, level) in groupBy(techCasting.powersKnown, 'level')", :key="level")
        h3.mt-2.d-flex.justify-space-between.align-end {{ powerLevelText(level) }}
          v-btn(
            v-if="level > 0",
            :disabled="isDisabled(level, techCasting)"
            color="primary",
            small,
            rounded,
            @click.stop="castTechPower(level)"
          ).ma-1 Cast
            span(v-if="level > 5") (1/long rest)
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
          div.d-flex
            h4 Force Points
            div(v-if="forceCasting.maxPoints === 0").caption.ml-3 None
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
        :value="forceCasting.maxPowerLevel",
        label="Max Power Level",
        ordinal,
        tweakPath="forceCasting.maxPowerLevel",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
      template(v-if="alignments.length === 1")
        CharacterSheetModifier(
          :value="forceCasting[alignments[0] + 'AttackModifier']",
          addPlus,
          :label="startCase(alignments[0]) + ' Attack Modifier'",
          :tweakPath="`forceCasting.${alignments[0]}AttackModifier`",
          @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
        )
        CharacterSheetModifier(
          :value="forceCasting[alignments[0] + 'SaveDC']",
          :label="startCase(alignments[0]) + ' Save DC'",
          :tweakPath="`forceCasting.${alignments[0]}SaveDC`",
          @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
        )
      v-container(v-else-if="alignments.length > 1")
        v-row(no-gutters)
          v-col(cols="2")
            div
          v-col(cols="6").d-flex.justify-end
            h4 Attack Modifier
          v-col(cols="4").d-flex.justify-center
            h4 Save DC
        v-row(v-if="alignments.includes('light')", no-gutters)
          v-col(cols="4")
            h5 Light
          v-col(cols="4").d-flex.justify-center
            CharacterSheetModifier(
              v-if="forceCasting.lightAttackModifier !== false",
              :value="forceCasting.lightAttackModifier",
              addPlus,
              title="Light Attack Modifier",
              tweakPath="forceCasting.lightAttackModifier",
              @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
            )
          v-col(cols="4").d-flex.justify-center
            CharacterSheetModifier(
              v-if="forceCasting.lightSaveDC !== false",
              :value="forceCasting.lightSaveDC",
              title="Light Save DC",
              tweakPath="forceCasting.lightSaveDC",
              @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
            )
        v-row(v-if="alignments.includes('universal')", no-gutters)
          v-col(cols="4")
            h5 Universal
          v-col(cols="4").d-flex.justify-center
            CharacterSheetModifier(
              v-if="forceCasting.universalAttackModifier !== false",
              :value="forceCasting.universalAttackModifier",
              addPlus,
              title="Universal Attack Modifier",
              tweakPath="forceCasting.universalAttackModifier",
              @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
            )
          v-col(cols="4").d-flex.justify-center
            CharacterSheetModifier(
              v-if="forceCasting.universalSaveDC !== false",
              :value="forceCasting.universalSaveDC",
              title="Universal Save DC",
              tweakPath="forceCasting.universalSaveDC",
              @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
            )
        v-row(v-if="alignments.includes('dark')", no-gutters)
          v-col(cols="4")
            h5 Dark
          v-col(cols="4").d-flex.justify-center
            CharacterSheetModifier(
              v-if="forceCasting.darkAttackModifier !== false",
              :value="forceCasting.darkAttackModifier",
              addPlus,
              title="Dark Attack Modifier",
              tweakPath="forceCasting.darkAttackModifier",
              @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
            )
          v-col(cols="4").d-flex.justify-center
            CharacterSheetModifier(
              v-if="forceCasting.darkSaveDC !== false",
              :value="forceCasting.darkSaveDC",
              title="Dark Save DC",
              tweakPath="forceCasting.darkSaveDC",
              @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
            )
      div(v-for="(powers, level) in groupBy(forceCasting.powersKnown, 'level')", :key="level")
        h3.mt-2.d-flex.justify-space-between.align-end {{ powerLevelText(level) }}
          v-btn(
            v-if="level > 0",
            :disabled="isDisabled(level, forceCasting)"
            color="primary",
            small,
            rounded,
            @click.stop="castForcePower(level)"
          ).ma-1 Cast
            span(v-if="level > 5") (1/long rest)
        CharacterSheetExpansionFeatures(:features="powers")
      div(v-if="forceCasting.powersKnown.length <= 0").mt-3
        v-btn(color="primary", @click="$emit('goToStep', 2)") Choose Powers
</template>
