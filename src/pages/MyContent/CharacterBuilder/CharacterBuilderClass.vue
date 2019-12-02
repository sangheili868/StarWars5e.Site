<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { chain, range } from 'lodash'
  import { ClassType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import ClassDetail from '@/components/ClassDetail.vue'
  import CharacterBuilderClassNew from './CharacterBuilderClassNew.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'

  @Component({
    components: {
      ClassDetail,
      CharacterBuilderClassNew,
      ConfirmDelete
    }
  })
  export default class CharacterBuilderClass extends Vue {
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly currentClasses!: RawClassType[]

    range = range

    handleAddClass ({ name, levels }: { name: string, levels: number }) {
      const position = this.currentClasses.length
      const newClassData = this.classes.find(({ name: newName }) => name === newName)
      if (newClassData) {
        const hitPoints = newClassData.hitDiceDieType
        this.$emit('updateCharacter', { classes: { [position]: {
          name,
          levels,
          hitPoints: [ ]
        } } })
      } else {
        console.error('Class not found: ', name)
      }
    }

    handleDeleteClass (index: number) {
      this.$emit('deleteCharacterProperty', { path: 'classes', index })
    }
  }
</script>

<template lang="pug">
  div
    h1 Choose a Class
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
              @change="levels => $emit('updateCharacter', { classes: { [index]: { levels } } }) "
            ).mr-3
            ConfirmDelete(label="Class", :item="myClass.name", @delete="handleDeleteClass(index)")
    CharacterBuilderClassNew(v-bind="{ classes, currentClasses }", @add="handleAddClass")

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
