<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import characterJson from '@/test/senyaComplete'
  import CharacterSheetTop from './CharacterSheetTop.vue'

  @Component({
    components: {
      CharacterSheetTop
    }
  })
  export default class CharacterSheet extends Vue {
    completeCharacter = characterJson
  }
</script>

<template lang="pug">
  div
    CharacterSheetTop(v-bind="{ completeCharacter }")
    pre.pt-5.text-xs-left {{ JSON.stringify(completeCharacter, null, 2) }}
</template>

<style module lang="scss">
/*
Segment size: 350px
Segments:
  Top:
    name
    Image
    species class (archetype) level
    Experience Points
  Health:
    Hit Points
    Hit Dice
    Death Saves
    Inspiration
  Ability Scores, Saves, Skills
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
