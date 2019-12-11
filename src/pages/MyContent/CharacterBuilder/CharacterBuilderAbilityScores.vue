<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { AbilityScoreMethodType } from '@/types/rawCharacterTypes'
  import { difference } from 'lodash'

  const standardArray = [ 15, 14, 13, 12, 10, 8 ]

  @Component
  export default class CharacterBuilderAbilityScores extends Vue {
    @Prop(String) readonly abilityScoreMethod!: AbilityScoreMethodType
    @Prop(Object) readonly currentScores!: { [ability: string]: number }

    get remainingScores () {
      return difference(standardArray, Object.values(this.currentScores))
    }

    checkAbilityScore (score: number) {
      return (score > 18 && 'Must be less than 18') ||
        (score < 3 && 'Must be greater than 3')
    }

    handleChangeMethod (newMethod: AbilityScoreMethodType) {
      this.$emit('updateCharacter', {
        baseAbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0
        },
        settings: { abilityScoreMethod: newMethod }
      })
    }

    handleChangeAbilityScore (ability: string, score: number) {
      this.$emit('updateCharacter', { baseAbilityScores: { [ability]: score || 0 } })
    }
  }
</script>

<template lang="pug">
  div
    h1 Determine Ability Scores
    v-autocomplete(
      :value="abilityScoreMethod"
      :items="[ 'Standard Array', 'Point Buy', 'Manual' ]",
      label="Choose a method"
      @change="handleChangeMethod"
    )
    div(v-if="abilityScoreMethod === 'Standard Array'").d-flex.flex-wrap
      v-autocomplete(
        v-for="(value, ability) in currentScores",
        :key="ability",
        :value="value || undefined",
        :items="[ ...(value > 0 ? [value] : []), ...remainingScores ]"
        outlined,
        clearable,
        :label="ability",
        @change="newScore => handleChangeAbilityScore(ability, parseInt(newScore))"
      ).pa-2
    div(v-else).d-flex.flex-wrap
      v-text-field(
        v-for="(value, ability) in currentScores",
        :key="ability"
        :value="value || undefined",
        outlined,
        type="number",
        :label="ability",
        :rules="[checkAbilityScore]"
        @change="newScore => handleChangeAbilityScore(ability, parseInt(newScore))"
      ).pa-2
</template>

<style module lang="scss">

</style>
