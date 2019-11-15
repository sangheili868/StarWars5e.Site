<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterBuilderSpecies extends Vue {

  }
</script>

<template lang="pug">
  div
    h1 Choose a Species
    ul.text-left
      li * Ability score improvements
      li * Tool proficiency
      li * Musical Instrument proficiency
      li * Skill proficiency
      li * Weapon proficiency
      li * Language
</template>

<style module lang="scss">

</style>
