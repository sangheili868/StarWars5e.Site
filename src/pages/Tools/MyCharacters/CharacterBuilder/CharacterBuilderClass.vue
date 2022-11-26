<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { chain, range, merge, omit, set } from 'lodash'
  import { ClassType, ArchetypeType, FeatureType } from '@/types/characterTypes'
  import { RawClassType, RawASIType, RawCharacterType } from '@/types/rawCharacterTypes'
  import { CharacterAdvancementType } from '@/types/lookupTypes'
  import CharacterBuilderClassHitPoints from './CharacterBuilderClassHitPoints.vue'
  import CharacterBuilderClassASI from './CharacterBuilderClassASI.vue'
  import CharacterBuilderClassPowers from './CharacterBuilderClassPowers.vue'
  import CharacterBuilderClassManeuvers from './CharacterBuilderClassManeuvers.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import MySelect from '@/components/MySelect.vue'
  import ClassDetail from '@/components/ClassDetail.vue'
  import CharactersArchetypeDetail from '@/pages/Characters/CharactersArchetypeDetail.vue'
  import CharacterSheetExpansionFeatures from '../CharacterSheet/CharacterSheetExpansionFeatures.vue'
  import MyDialog from '@/components/MyDialog.vue'
  import { mapFeatureConfigs } from '@/modules/CharacterEngine/generateFeatures'
  import { CompletedFeatureType } from '@/types/completeCharacterTypes'

  const archetypesModule = namespace('archetypes')

  @Component({
    components: {
      CharacterBuilderClassHitPoints,
      CharacterBuilderClassASI,
      CharacterBuilderClassPowers,
      CharacterBuilderClassManeuvers,
      CharacterSheetExpansionFeatures,
      ConfirmDelete,
      ClassDetail,
      CharactersArchetypeDetail,
      MyDialog,
      MySelect
    }
  })
  export default class CharacterBuilderClass extends Vue {
    @Prop(Object) readonly character!: RawCharacterType
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly features!: CompletedFeatureType[]
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Number) readonly index!: number
    @Prop(Boolean) readonly isFixedHitPoints!: boolean
    @Prop(Array) readonly characterAdvancements!: CharacterAdvancementType[]

    @archetypesModule.State archetypes!: ArchetypeType[]
    @archetypesModule.Action fetchArchetypes!: () => void
    range = range

    isClassOpen = false
    isArchetypeOpen = false

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

    get allForcePowers () {
      return [
        ...this.character.customForcePowers,
        ...this.character.classes.map(({ forcePowers }) => forcePowers || []).flat()
      ]
    }

    get classFeatures () {
      var tempFeatureConfigs = JSON.parse(JSON.stringify(this.character.featureConfigs))
      var features = chain(this.features.map(f => f))
        .filter(({ sourceName, level }) => this.classData
          ? this.classData.name === sourceName && level !== undefined && level <= this.myClass.levels
          : false
        )
        .sortBy('level')
        .reverse()
        .uniqBy(({ name, sourceName }) => name + sourceName)
        .reverse()
        .value()
      features.forEach(f => mapFeatureConfigs(f, tempFeatureConfigs))
      return features
    }

    get archetypeFeatures () {
      var tempFeatureConfigs = JSON.parse(JSON.stringify(this.character.featureConfigs))
      var features = chain(this.features.map(f => f))
        .filter(({ sourceName, level }) => this.archetypeData
          ? this.archetypeData.name === sourceName && level !== undefined && level <= this.myClass.levels
          : false
        )
        .sortBy('level')
        .reverse()
        .uniqBy(({ name, sourceName }) => name + sourceName)
        .reverse()
        .value()
      features.forEach(f => mapFeatureConfigs(f, tempFeatureConfigs))
      return features
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

    handleUpdateManeuvers (newManeuvers: string[], isArchetype: boolean) {
      this.$emit('replaceCharacterProperty', {
        path: `classes.${this.index}.${isArchetype ? 'archetype.' : ''}maneuvers`,
        property: newManeuvers
      })
    }

    handleUpdateHitPoints (newValue: number, hpIndex: number) {
      this.$emit('updateCharacter', { classes: { [this.index]: { hitPoints: { [hpIndex]: newValue } } } })
    }

    handleDeleteClass () {
      const advancement = this.characterAdvancements.find(({ level }) => level === this.totalOtherClassesLevels)
      const experiencePoints = advancement ? advancement.experiencePoints : 0
      let newClasses = this.character.classes.filter((_, index) => index !== this.index)
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
  div.text-left
    div.d-flex.align-center.flex-wrap
      MyDialog(v-model="isClassOpen", wide)
        template(v-slot:activator="{ on }")
          v-btn(v-on="on") View Class Details
        template(#title) {{ classData.name }}
        template(#text)
          ClassDetail(v-bind="{ classData }", isHidingBack).mt-5
        template(#actions)
          v-spacer
          v-btn(color="primary", text, @click="isClassOpen=false") Close
      MyDialog(v-if="myClass.archetype", v-model="isArchetypeOpen", wide).ml-3
        template(v-slot:activator="{ on }")
          v-btn(v-on="on") View Archetype Details
        template(#title) {{ myClass.archetype.name}}
        template(#text)
          CharactersArchetypeDetail(:archetypeName="myClass.archetype.name", isHidingBack).mt-5
        template(#actions)
          v-spacer
          v-btn(color="primary", text, @click="isArchetypeOpen=false") Close
      MySelect(
        :value="myClass.levels",
        :items="range(1, 21 - totalOtherClassesLevels)",
        label="Number of levels in this class",
        @change="levels => handleUpdateLevels(levels)"
      ).ml-3.mt-3
      ConfirmDelete(
        label="Class",
        :item="myClass.name",
        @delete="handleDeleteClass"
      ).ml-3.mt-3
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
    h3 Class Features
    CharacterSheetExpansionFeatures(:features="classFeatures", @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)")
    h3(v-if="archetypeFeatures.length > 0").mt-3 Archetype Features
    CharacterSheetExpansionFeatures(:features="archetypeFeatures", @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)")
    h3(v-if="asiLevels.length > 0").mt-3 Ability Score Improvements
    CharacterBuilderClassASI(
      v-for="(asiLevel, index) in asiLevels",
      :key="asiLevel",
      v-bind="{ myClass, index }",
      @updateASI="newASI => handleUpdateASI(index, newASI)"
    )
    CharacterBuilderClassPowers(
      v-bind="{ myClass, classData, archetypeData, allForcePowers }",
      :settings="character.settings",
      @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)",
      @updatePowers="({ newPowers, type, isArchetype }) => handleUpdatePowers(newPowers, type, isArchetype)"
    )
    CharacterBuilderClassManeuvers(
      v-bind="{ myClass, classData, archetypeData, allForcePowers }",
      :settings="character.settings",
      @updateManeuvers="({ newManeuvers, isArchetype }) => handleUpdateManeuvers(newManeuvers, isArchetype)"
    )
</template>
