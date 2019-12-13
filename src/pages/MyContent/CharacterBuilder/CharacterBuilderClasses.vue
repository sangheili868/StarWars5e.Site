<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import CharacterBuilderClassNew from './CharacterBuilderClassNew.vue'
  import CharacterBuilderClassHitPoints from './CharacterBuilderClassHitPoints.vue'
  import CharacterBuilderClass from './CharacterBuilderClass.vue'

  @Component({
    components: {
      CharacterBuilderClass,
      CharacterBuilderClassNew,
      CharacterBuilderClassHitPoints
    }
  })
  export default class CharacterBuilderClasses extends Vue {
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly currentClasses!: RawClassType[]
    @Prop(Boolean) readonly isFixedHitPoints!: boolean

    get currentLevel () {
      return this.currentClasses.reduce((acc, { levels }) => acc + levels, 0)
    }

    handleAddClass ({ name, levels }: { name: string, levels: number }) {
      const position = this.currentClasses.length
      const newClassData = this.classes.find(({ name: className }) => name === className)
      if (!newClassData) console.error('Class not found: ', name)
      const amount = newClassData ? newClassData.hitPointsAtHigherLevelsNumber : 0
      this.$emit('updateCharacter', { classes: { [position]: {
        name,
        levels,
        hitPoints: Array(position === 0 ? levels - 1 : levels).fill(amount),
        abilityScoreImprovements: []
      } } })
    }

    getClassTitle (myClass: RawClassType) {
      const archetype = myClass.archetype ? ` (${myClass.archetype.name})` : ''
      return myClass.name + archetype + ' ' + myClass.levels
    }
  }
</script>

<template lang="pug">
  div
    h1 Choose a Class
    div.mb-3 #[strong Current Level:] {{ currentLevel }}
    v-expansion-panels(accordion, :value="0")
      v-expansion-panel(v-for="(myClass, index) in currentClasses", :key="myClass.name")
        v-expansion-panel-header
          div.d-flex.align-center
            h4 {{ getClassTitle(myClass) }}
            span(v-if="(index === 0) && currentClasses.length > 1").grey--text.pl-3.caption Starting Class
        v-expansion-panel-content
          CharacterBuilderClass(
            v-bind="{ myClass, classes, index, isFixedHitPoints }",
            @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
            @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
          )
    CharacterBuilderClassNew(v-bind="{ classes, currentClasses }", @add="handleAddClass")
    h2.mt-5 Settings
    div.d-flex.align-center
      h5.mr-5 Hit Points Method:
      v-autocomplete(
        :value="isFixedHitPoints ? 'Fixed' : 'Manual'",
        :items="['Fixed', 'Manual']",
        :class="$style.method"
        @input="newMethod => $emit('updateCharacter', { settings: { isFixedHitPoints: newMethod === 'Fixed' } })"
      )
</template>

<style module lang="scss">
  .method {
    max-width: 110px !important;
  }
</style>
