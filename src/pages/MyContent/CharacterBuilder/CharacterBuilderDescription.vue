<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterBuilderDescription extends Vue {

  }
</script>

<template lang="pug">
  div
    h1 Describe Your Character
    ul.text-left
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
</template>

<style module lang="scss">

</style>
