<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import characterJson from '@/test/senyaComplete'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetAbilities from './CharacterSheetAbilities.vue'

  @Component({
    components: {
      CharacterSheetTop,
      CharacterSheetAbilities
    }
  })
  export default class CharacterSheet extends Vue {
    completeCharacter = characterJson
  }
</script>

<template lang="pug">
  div
    CharacterSheetTop(v-bind="{ completeCharacter }")
    v-container(grid-list-md).pa-0
      v-layout
        v-flex(sm4 xs12)
          CharacterSheetAbilities(:abilityScores="completeCharacter.abilityScores")
    pre.pt-5.text-xs-left {{ JSON.stringify(completeCharacter, null, 2) }}
</template>

<style module lang="scss">
/*
Segment size: 350px
Segments:
  Health:
    Death Saves
    Inspiration
  Senses & Speed:
    Passive Perception
    Vision
    Speed
  Combat:
    Speed
    Prof. Bonus
    Initiative
    AC & Sources
    Weapons
  Description:
    Alignment
    Background
    Proficiencies
    Languages
    Characteristics
  Equipment
    Items
    Credits
    Capacity
  Casting
    Points
    Attack/DC
    Powers
*/
</style>
