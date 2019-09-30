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
      li Basics
        ul
          li Name
          li Image
          li Username
          li Level/Experience Points
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
      li Ability Scores
      li Description
      li Equipment
</template>
