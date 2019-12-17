<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { AbilityScoreMethodType } from '@/types/rawCharacterTypes'
  import { difference, chain } from 'lodash'
  import MySelect from '@/components/MySelect.vue'

  const standardArray = [ 15, 14, 13, 12, 10, 8 ]
  const pointMap: { [score: string]: number } = {
    0: 0,
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9
  }

  @Component({
    components: {
      MySelect
    }
  })
  export default class CharacterBuilderAbilityScores extends Vue {
    @Prop(String) readonly abilityScoreMethod!: AbilityScoreMethodType
    @Prop(Object) readonly currentScores!: { [ability: string]: number }

    get remainingPoints () {
      return 27 - Object.values(this.currentScores).reduce((acc, score) => acc + pointMap[score], 0)
    }

    getOptions (currentValue: number) {
      if (this.abilityScoreMethod === 'Standard Array') {
        const current = currentValue > 0 ? [currentValue] : []
        return [ ...current, ...difference(standardArray, Object.values(this.currentScores)) ]
      } else {
        return chain(Object.keys(pointMap))
          .map(score => ({ value: parseInt(score), text: `${score} (${pointMap[score]} points)` }))
          .filter(({ value }) => {
            const isAbleToAfford = pointMap[value] <= this.remainingPoints + pointMap[currentValue]
            return (value === currentValue || isAbleToAfford) && value > 0
          })
          .value()
      }
    }

    checkAbilityScore (score: number) {
      return (score > 20 && 'Must be less than 21') ||
        (score < 1 && 'Must be greater than 0')
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
    MySelect(
      :value="abilityScoreMethod"
      :items="[ 'Standard Array', 'Point Buy', 'Manual' ]",
      label="Choose a method"
      @change="handleChangeMethod"
    )
    div(v-if="abilityScoreMethod === 'Point Buy'")
      div #[strong Remaining Points:] {{ remainingPoints}}
    div(v-if="abilityScoreMethod === 'Manual'").d-flex.flex-wrap
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
    div(v-else).d-flex.flex-wrap
      MySelect(
        v-for="(value, ability) in currentScores",
        :key="ability",
        :value="value || undefined",
        :items="getOptions(value)",
        outlined,
        clearable,
        :label="ability",
        @change="newScore => handleChangeAbilityScore(ability, parseInt(newScore))"
      ).pa-2
</template>
