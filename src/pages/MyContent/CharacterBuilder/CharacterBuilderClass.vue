<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { chain, range, merge, omit, set } from 'lodash'
  import { ClassType, ArchetypeType } from '@/types/characterTypes'
  import { RawClassType, RawASIType, RawCharacterType } from '@/types/rawCharacterTypes'
  import { CharacterAdvancementType } from '@/types/lookupTypes'
  import CharacterBuilderClassHitPoints from './CharacterBuilderClassHitPoints.vue'
  import CharacterBuilderClassASI from './CharacterBuilderClassASI.vue'
  import CharacterBuilderClassPowers from './CharacterBuilderClassPowers.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import MySelect from '@/components/MySelect.vue'
  import CharacterBuilderClassDetail from './CharacterBuilderClassDetail.vue'

  const archetypesModule = namespace('archetypes')

  @Component({
    components: {
      CharacterBuilderClassHitPoints,
      CharacterBuilderClassASI,
      CharacterBuilderClassPowers,
      CharacterBuilderClassDetail,
      ConfirmDelete,
      MySelect
    }
  })
  export default class CharacterBuilderClass extends Vue {
    @Prop(Object) readonly character!: RawCharacterType
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Number) readonly index!: number
    @Prop(Boolean) readonly isFixedHitPoints!: boolean
    @Prop(Array) readonly characterAdvancements!: CharacterAdvancementType[]

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

    get totalOtherClassesLevels () {
      return this.character.classes
        .filter(({ name }) => name !== this.myClass.name)
        .reduce((acc, { levels }) => acc + levels, 0)
    }

    handleUpdateLevels (levels: number) {
      const amount = this.classData ? this.classData.hitPointsAtHigherLevelsNumber : 0
      const newFixedHP = Array(this.index === 0 ? levels - 1 : levels).fill(amount)
      const hitPoints = merge([], newFixedHP, this.myClass.hitPoints).slice(0, newFixedHP.length)
      const archetype = levels < 3 ? undefined : this.myClass.archetype
      const newLevel = this.totalOtherClassesLevels + levels
      const newLevelAdvancement = this.characterAdvancements.find(({ level }) => level === newLevel)
      const experiencePoints = Math.max(newLevelAdvancement ? newLevelAdvancement.experiencePoints : 0, this.character.experiencePoints)
      const abilityScoreImprovements = this.myClass.abilityScoreImprovements.slice(0, this.asiLevels.length)
      this.$emit('replaceCharacterProperties', [
        {
          path: 'classes.' + this.index,
          property: {
            ...this.myClass,
            levels,
            hitPoints,
            abilityScoreImprovements,
            archetype
          }
        },
        { path: 'experiencePoints', property: experiencePoints }
      ])
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

    handleDeleteClass () {
      const advancement = this.characterAdvancements.find(({ level }) => level === this.totalOtherClassesLevels)
      const experiencePoints = advancement ? advancement.experiencePoints : 0
      let newClasses = Object.values(omit(this.character.classes, this.index))
      // Starting class changed, so use its max hit points for level 1
      if (this.index === 0 && newClasses.length) newClasses[0].hitPoints = newClasses[0].hitPoints.slice(1)
      this.$emit('replaceCharacterProperties', [
        {
          path: 'classes',
          property: newClasses
        },
        { path: 'experiencePoints', property: experiencePoints }
      ])
    }
  }
</script>

<template lang="pug">
  div
    CharacterBuilderClassDetail(:classData="classData", :archetypeName="myClass.archetype && myClass.archetype.name")
    div.d-flex.align-center
      MySelect(
        :value="myClass.levels",
        :items="range(1, 21 - totalOtherClassesLevels)",
        label="Number of levels in this class",
        @change="levels => handleUpdateLevels(levels)"
      ).mr-3.mt-3
      ConfirmDelete(
        label="Class",
        :item="myClass.name",
        @delete="handleDeleteClass"
      )
    div(v-if="!isFixedHitPoints")
      h3 Hit Points
      CharacterBuilderClassHitPoints(
        v-bind="{ myClass, classData, isStartingClass: index === 0 }",
        @updateHitPoints="({ newValue, hpIndex }) => handleUpdateHitPoints(newValue, hpIndex)"
      )
    MySelect(
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
