<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { chain } from 'lodash'
  import { ClassType } from '@/types/characterTypes'
  import ClassDetail from '@/components/ClassDetail.vue'

  @Component({
    components: {
      ClassDetail
    }
  })
  export default class CharacterBuilderClass extends Vue {
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly currentClasses!: ClassType[]

    get classChoices () {
      return this.classes.map(({ name }) => name)
    }

    get currentClassName () {
      return this.currentClasses[0] ? this.currentClasses[0].name : ''
    }

    get currentClassData () {
      return this.classes.find(({ name }) => this.currentClassName === name)
    }

    handleChangeClass (newClass: string) {
      const position = this.currentClasses.length
      const newClassData = this.classes.find(({ name }) => name === newClass)
      if (newClassData) {
        const hitPoints = newClassData.hitDiceDieType
        this.$emit('updateCharacter', { classes: { 0: {
          name: newClass,
          isStartingClass: true,
          levels: 1,
          hitPoints: [ ]
        } } })
      } else {
        console.error('Class not found: ', newClass)
      }
    }
  }
</script>

<template lang="pug">
  div
    h1 Choose a Class
    v-autocomplete(
      :Value="currentClassName"
      :items="classChoices",
      label="Choose a class",
      @change="handleChangeClass"
    )
    ClassDetail(v-if="currentClassData !== -1", :classData="currentClassData", isHidingBack)
    h2.text-left.mt-5 TODO:
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
