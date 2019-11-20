<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterBuilderAbilityScores extends Vue {
    @Prop(Object) readonly currentScores!: { [ability: string]: number }
    method = 'Manual'

    checkAbilityScore (score: number) {
      return (score > 18 && 'Must be less than 18') ||
        (score < 3 && 'Must be greater than 3')
    }

    handleChangeAbilityScore (ability: string, score: number) {
      this.$emit('updateCharacter', { baseAbilityScores: { [ability]: score } })
    }
  }
</script>

<template lang="pug">
  div
    h1 Determine Ability Scores
    v-autocomplete(v-model="method", :items="[ 'Standard Array', 'Point Buy', 'Manual' ]", label="Choose a method")
    div.d-flex
      div(v-for="(value, ability) in currentScores", :key="ability").pa-2
        v-text-field(
          :value="value",
          outlined,
          type="number",
          :label="ability",
          :rules="[checkAbilityScore]"
          @change="newScore => handleChangeAbilityScore(ability, newScore)"
        )
</template>

<style module lang="scss">

</style>
