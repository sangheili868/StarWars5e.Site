<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterBuilder extends Vue {

  }
</script>

<template lang="pug">
  div
    h1 Character Builder
    div Coming Soon!
    ol.text-left
      li Settings
        ul
          li Username
          li Fixed or Roll hit points
          li Ability Score Method (Manual, Standard Set, Point Buy)
          li Defense Rolls?
          li Saving Throw Checks?
      li Species
        ul
          li Species
          li * Ability score improvements
          li * Tool proficiency
          li * Musical Instrument proficiency
          li * Skill proficiency
          li * Weapon proficiency
          li * Language
      li Class
        ul
          li Class
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
      li Ability Scores
      li Description
        ul
          li Name
          li Image
          li Alignment
          li Background
            ul
              li Skills
              li * Tool Proficiencies
              li * Languages
              li * Feat
          li Characteristics
      li Equipment
        li Starting Equipment or Wealth
</template>
