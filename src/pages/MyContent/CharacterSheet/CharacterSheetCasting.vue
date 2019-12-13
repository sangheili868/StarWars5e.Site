<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CastingType } from '@/types/completeCharacterTypes'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import { groupBy } from 'lodash'
  import CharacterSheetTicker from './CharacterSheetTicker.vue'
  import CheckList from '@/components/CheckList.vue'
  import ordinal from 'ordinal'

  @Component({
    components: {
      CheckList,
      CharacterSheetModifier,
      CharacterSheetExpansionFeatures,
      CharacterSheetTicker
    }
  })
  export default class CharacterSheetCasting extends Vue {
    @Prop(Object) readonly techCasting!: CastingType
    @Prop(Object) readonly forceCasting!: CastingType
    groupBy = groupBy
    ordinal = ordinal

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
    div(v-if="techCasting.powersKnown && techCasting.powersKnown.length")
      h3 Tech Casting
      CharacterSheetTicker(
        v-if="techCasting.maxPoints > 10",
        :current="Math.max(0, techCasting.maxPoints - techCasting.pointsUsed)",
        :max="techCasting.maxPoints",
        @changeCount="currentPoints => handleChangeTechPoints(Math.max(0, techCasting.maxPoints - currentPoints))"
      ) Tech Points
      CheckList(
        v-else,
        :current="techCasting.pointsUsed",
        :maximum="techCasting.maxPoints",
        title="Tech Points",
        @changeSelected="handleChangeTechPoints"
      )
      CharacterSheetModifier(:modifier="techCasting.attackModifier", label="Tech Attack Modifier", small)
      CharacterSheetModifier(:modifier="techCasting.saveDC", label="Tech Save DC", isFlatNumber, small)
      CharacterSheetModifier(:modifier="ordinal(techCasting.maxPowerLevel)", label="Max Power Level", isFlatNumber, small)
      div(v-for="(powers, level) in groupBy(techCasting.powersKnown, 'level')", :key="level")
        h3.mt-2 {{ powerLevelText(level) }}
        CharacterSheetExpansionFeatures(:features="powers")
    div(v-if="forceCasting.powersKnown && forceCasting.powersKnown.length")
      h3 Force Casting
      CharacterSheetTicker(
        v-if="forceCasting.maxPoints > 10",
        :current="Math.max(0, forceCasting.maxPoints - forceCasting.pointsUsed)",
        :max="forceCasting.maxPoints",
        @changeCount="currentPoints => handleChangeForcePoints(Math.max(0, forceCasting.maxPoints - currentPoints))"
      ) Force Points
      CheckList(
        v-else,
        :current="forceCasting.pointsUsed",
        :maximum="forceCasting.maxPoints",
        title="Force Points",
        @changeSelected="handleChangeForcePoints"
      )
      CharacterSheetModifier(:modifier="forceCasting.lightAttackModifier", label="Light Attack Modifier", small)
      CharacterSheetModifier(:modifier="forceCasting.lightSaveDC", label="Light Save DC", isFlatNumber, small)
      CharacterSheetModifier(:modifier="forceCasting.darkAttackModifier", label="Dark Attack Modifier", small)
      CharacterSheetModifier(:modifier="forceCasting.darkSaveDC", label="Dark Save DC", isFlatNumber, small)
      CharacterSheetModifier(:modifier="forceCasting.universalAttackModifier", label="Universal Attack Modifier", small)
      CharacterSheetModifier(:modifier="forceCasting.universalSaveDC", label="Universal Save DC", isFlatNumber, small)
      CharacterSheetModifier(:modifier="ordinal(forceCasting.maxPowerLevel)", label="Max Power Level", isFlatNumber, small)
      div(v-for="(powers, level) in groupBy(forceCasting.powersKnown, 'level')", :key="level")
        h3.mt-2 {{ powerLevelText(level) }}
        CharacterSheetExpansionFeatures(:features="powers")
</template>
