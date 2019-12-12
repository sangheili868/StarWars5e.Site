<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { chain, range, merge } from 'lodash'
  import { ClassType, ArchetypeType } from '@/types/characterTypes'
  import { RawClassType, RawASIType } from '@/types/rawCharacterTypes'
  import CharacterBuilderClassHitPoints from './CharacterBuilderClassHitPoints.vue'
  import CharacterBuilderClassASI from './CharacterBuilderClassASI.vue'
  import CharacterBuilderClassPowers from './CharacterBuilderClassPowers.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'

  const archetypesModule = namespace('archetypes')

  @Component({
    components: {
      CharacterBuilderClassHitPoints,
      CharacterBuilderClassASI,
      CharacterBuilderClassPowers,
      ConfirmDelete
    }
  })
  export default class CharacterBuilderClass extends Vue {
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Number) readonly index!: number
    @Prop(Boolean) readonly isFixedHitPoints!: boolean

    @archetypesModule.State archetypes!: ArchetypeType[]
    @archetypesModule.Action fetchArchetypes!: () => void
    range = range

    created () {
      this.fetchArchetypes()
    }

    get classData () {
      const classData = this.classes.find(({ name }) => name === this.myClass.name)
      if (!classData) console.error('Class not found: ', this.myClass.name)
      return classData
    }

    get archetypeData () {
      const myArchetype = this.myClass.archetype && this.myClass.archetype.name
      const archetypeData = this.archetypes.find(({ name }) => name === myArchetype)
      if (myArchetype && !archetypeData) console.error('Archetype not found: ', myArchetype)
      return archetypeData
    }

    get asiLevels () {
      return this.classData ? chain(this.classData.levelChanges)
        .map((value, level) => ({ ...value, level }))
        .filter(({ Features, level }) => Features.includes('Ability Score Improvement') && level <= this.myClass.levels)
        .map(({ level }) => parseInt(level))
        .value() : []
    }

    get archetypeOptions () {
      return this.archetypes.filter(({ className }) => className === this.myClass.name).map(({ name }) => name)
    }

    handleUpdateLevels (levels: number) {
      const amount = this.classData ? this.classData.hitPointsAtHigherLevelsNumber : 0
      const newFixedHP = Array(this.index === 0 ? levels - 1 : levels).fill(amount)
      const hitPoints = merge([], newFixedHP, this.myClass.hitPoints).slice(0, newFixedHP.length)
      const archetype = levels < 3 ? undefined : this.myClass.archetype
      this.$emit('replaceCharacterProperty', {
        path: 'classes.' + this.index,
        property: {
          ...this.myClass,
          levels,
          hitPoints,
          abilityScoreImprovements: [],
          archetype
        }
      })
    }

    handleUpdateArchetype (name: string) {
      this.$emit('replaceCharacterProperty', {
        path: `classes.${this.index}.archetype`,
        property: { name }
      })
    }

    handleUpdateASI (index: number, newASI: RawASIType) {
      this.$emit('replaceCharacterProperty', {
        path: `classes.${this.index}.abilityScoreImprovements.${index}`,
        property: newASI
      })
    }

    handleUpdatePowers (newPowers: string[], type: 'Tech' | 'Force', isArchetype: boolean) {
      this.$emit('replaceCharacterProperty', {
        path: `classes.${this.index}.${isArchetype ? 'archetype.' : ''}${type.toLowerCase()}Powers`,
        property: newPowers
      })
    }

    handleUpdateHitPoints (newValue: number, hpIndex: number) {
      this.$emit('updateCharacter', { classes: { [this.index]: { hitPoints: { [hpIndex]: newValue } } } })
    }
  }
</script>

<template lang="pug">
  div
    div.d-flex.align-center
      v-autocomplete(
        :value="myClass.levels",
        :items="range(1,21)",
        label="Number of levels in this class",
        @change="levels => handleUpdateLevels(levels)"
      ).mr-3
      ConfirmDelete(
        label="Class",
        :item="myClass.name",
        @delete="$emit('deleteCharacterProperty', { path: 'classes', index })"
      )
    div(v-if="!isFixedHitPoints")
      h3 Hit Points
      CharacterBuilderClassHitPoints(
        v-bind="{ myClass, classData, isStartingClass: index === 0 }",
        @updateHitPoints="({ newValue, hpIndex }) => handleUpdateHitPoints(newValue, hpIndex)"
      )
    v-autocomplete(
      v-if="myClass.levels >= 3",
      :value="myClass.archetype && myClass.archetype.name",
      :items="archetypeOptions",
      label="Archetype",
      @change="handleUpdateArchetype"
    )
    h3(v-if="asiLevels.length > 0") Ability Score Improvements
    CharacterBuilderClassASI(
      v-for="(asiLevel, index) in asiLevels",
      :key="asiLevel",
      v-bind="{ myClass, index }",
      @updateASI="newASI => handleUpdateASI(index, newASI)"
    )
    CharacterBuilderClassPowers(
      v-bind="{ myClass, classData, archetypeData }",
      @updatePowers="({ newPowers, type, isArchetype }) => handleUpdatePowers(newPowers, type, isArchetype)"
    )
</template>
