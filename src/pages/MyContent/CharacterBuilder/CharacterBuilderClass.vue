<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { chain, range, merge } from 'lodash'
  import { ClassType } from '@/types/characterTypes'
  import { RawClassType, RawASIType } from '@/types/rawCharacterTypes'
  import CharacterBuilderClassASI from './CharacterBuilderClassASI.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'

  @Component({
    components: {
      CharacterBuilderClassASI,
      ConfirmDelete
    }
  })
  export default class CharacterBuilderClass extends Vue {
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Number) readonly index!: number

    range = range

    get classData () {
      const classData = this.classes.find(({ name }) => name === this.myClass.name)
      if (!classData) console.error('Class not found: ', this.myClass.name)
      return classData
    }

    get asiLevels () {
      return this.classData ? chain(this.classData.levelChanges)
        .map((value, level) => ({ ...value, level }))
        .filter(({ Features, level }) => Features.includes('Ability Score Improvement') && level <= this.myClass.levels)
        .map(({ level }) => parseInt(level))
        .value() : []
    }

    handleUpdateLevels (levels: number) {
      const amount = this.classData ? this.classData.hitPointsAtHigherLevelsNumber : 0
      const newFixedHP = Array(this.index === 0 ? levels - 1 : levels).fill(amount)
      const hitPoints = merge([], newFixedHP, this.myClass.hitPoints).slice(0, newFixedHP.length)
      this.$emit('replaceCharacterProperty', {
        path: 'classes.' + this.index,
        property: {
          ...this.myClass,
          levels,
          hitPoints
        }
      })
    }

    handleUpdateASI (index: number, newASI: RawASIType) {
      this.$emit('replaceCharacterProperty', {
        path: `classes.${this.index}.abilityScoreImprovements.${index}`,
        property: newASI
      })
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
    h3 Ability Score Improvements
    CharacterBuilderClassASI(
      v-for="(asiLevel, index) in asiLevels",
      :key="asiLevel",
      v-bind="{ myClass, index }",
      @updateASI="newASI => handleUpdateASI(index, newASI)"
    )
</template>
