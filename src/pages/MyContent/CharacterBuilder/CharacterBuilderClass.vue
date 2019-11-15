<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterBuilderClass extends Vue {

  }
</script>

<template lang="pug">
  div
    h1 Choose a Class
    ul.text-left
      li is starting class
      li Levels
      li Hit Points
      li * Tool proficiency
      li Skills
      li Ability Score Improvements
      li * Fighting Style
      li * Maneuvers
      li * Tech Powers
      li * Force Powers
      li * Expertise
      li * Discoveries (Scholar)
      li * Empowerment Options (Consular)
      li * Sentinel Ideals (Sentinel)
      li * Guardian Aura (Guardian)
      li * Archetype
        ul
          li * Skill Proficiencies
          li * Fighting Style
          li * Languages
          li * Tech Powers
          li * Force Powers
          li * Maneuvers
          li * Silver Tongue (Politician Pursuit)
          li * Cybernetic Enhancements (Augmented Approach)
          li * Modifications (Engineer)
          li * Droid Companion (Astrotech Engineer)
          li * Echani Weapons (Echani Order)
          li * Hunter Features (Hunter Technique)
</template>

<style module lang="scss">

</style>
