<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { chain, range, merge } from 'lodash'
  import { ClassType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import ClassDetail from '@/components/ClassDetail.vue'
  import CharacterBuilderClassNew from './CharacterBuilderClassNew.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import CharacterBuilderClassHitPoints from './CharacterBuilderClassHitPoints.vue'

  @Component({
    components: {
      ClassDetail,
      CharacterBuilderClassNew,
      CharacterBuilderClassHitPoints,
      ConfirmDelete
    }
  })
  export default class CharacterBuilderClass extends Vue {
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly currentClasses!: RawClassType[]
    @Prop(Boolean) readonly isFixedHitPoints!: boolean

    range = range

    get currentLevel () {
      return this.currentClasses.reduce((acc, { levels }) => acc + levels, 0)
    }

    getFixedHPArray (index: number, className: string, levels: number) {
      const newClassData = this.classes.find(({ name }) => name === className)
      if (newClassData) {
        return Array(index === 0 ? levels - 1 : levels).fill(newClassData.hitPointsAtHigherLevelsNumber)
      } else {
        console.error('Class not found: ', name)
        return []
      }
    }

    handleAddClass ({ name, levels }: { name: string, levels: number }) {
      const position = this.currentClasses.length
      this.$emit('updateCharacter', { classes: { [position]: {
        name,
        levels,
        hitPoints: this.getFixedHPArray(this.currentClasses.length, name, levels)
      } } })
    }

    handleUpdateLevels (index: number, levels: number) {
      const currentClass = this.currentClasses[index]
      const newFixedHP = this.getFixedHPArray(index, currentClass.name, levels)
      const hitPoints = merge([], newFixedHP, currentClass.hitPoints).slice(0, newFixedHP.length)
      this.$emit('replaceCharacterProperty', {
        path: 'classes.' + index,
        property: {
          ...currentClass,
          levels,
          hitPoints
        }
      })
    }

    handleDeleteClass (index: number) {
      this.$emit('deleteCharacterProperty', { path: 'classes', index })
    }
  }
</script>

<template lang="pug">
  div
    h1 Choose a Class
    div Current Level: {{ currentLevel }}
    v-expansion-panels(accordian)
      v-expansion-panel(v-for="(myClass, index) in currentClasses", :key="myClass.name")
        v-expansion-panel-header
          div.d-flex.align-center
            h4 {{ myClass.archetype ? myClass.archetype.name : '' }} {{ myClass.name }} {{ myClass.levels }}
            span(v-if="(index === 0) && currentClasses.length > 1").grey--text.pl-3.caption Starting Class
        v-expansion-panel-content
          //- ClassDetail(:classData="classes.find(({ name }) => name === myClass.name)", isHidingBack)
          div.d-flex.align-center
            v-autocomplete(
              :value="myClass.levels",
              :items="range(1,21)",
              label="Number of levels in this class",
              @change="levels => handleUpdateLevels(index, levels)"
            ).mr-3
            ConfirmDelete(label="Class", :item="myClass.name", @delete="handleDeleteClass(index)")
    CharacterBuilderClassNew(v-bind="{ classes, currentClasses }", @add="handleAddClass")
    CharacterBuilderClassHitPoints(
      v-bind="{ classes, currentClasses, isFixedHitPoints }",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
    )

    h2.text-left.mt-5 TODO:
    ul.text-left
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
