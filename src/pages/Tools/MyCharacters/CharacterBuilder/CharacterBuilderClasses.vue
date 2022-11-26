<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ClassType, FeatureType } from '@/types/characterTypes'
  import { RawClassType, RawCharacterType } from '@/types/rawCharacterTypes'
  import { CharacterAdvancementType } from '@/types/lookupTypes'
  import CharacterBuilderClassNew from './CharacterBuilderClassNew.vue'
  import CharacterBuilderClassHitPoints from './CharacterBuilderClassHitPoints.vue'
  import CharacterBuilderClass from './CharacterBuilderClass.vue'
  import MySelect from '@/components/MySelect.vue'

  const characterAdvancementsModule = namespace('characterAdvancements')

  @Component({
    components: {
      CharacterBuilderClass,
      CharacterBuilderClassNew,
      CharacterBuilderClassHitPoints,
      MySelect
    }
  })
  export default class CharacterBuilderClasses extends Vue {
    @Prop(Object) readonly character!: RawCharacterType
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly features!: FeatureType[]

    @characterAdvancementsModule.State characterAdvancements!: CharacterAdvancementType[]
    @characterAdvancementsModule.Action fetchCharacterAdvancements!: () => void

    created () {
      this.fetchCharacterAdvancements()
    }

    get currentClasses () {
      return this.character.classes
    }

    get isFixedHitPoints () {
      return this.character.settings.isFixedHitPoints
    }

    get currentLevel () {
      return this.currentClasses.reduce((acc, { levels }) => acc + levels, 0)
    }

    handleAddClass (name: string) {
      const position = this.currentClasses.length
      const newClassData = this.classes.find(({ name: className }) => name === className)
      if (!newClassData) console.error('Class not found: ', name)
      const amount = newClassData ? newClassData.hitPointsAtHigherLevelsNumber : 0
      const advancement = this.characterAdvancements.find(({ level }) => level === this.currentLevel + 1)
      const experiencePoints = advancement ? advancement.experiencePoints : this.character.experiencePoints
      this.$emit('updateCharacter', {
        classes: {
          [position]: {
            name,
            levels: 1,
            hitPoints: position === 0 ? [] : [amount],
            abilityScoreImprovements: []
          }
        },
        experiencePoints
      })
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
    div.d-flex.justify-space-around.flex-wrap.mb-3.align-center
      div #[strong Current Level:] {{ currentLevel }}
      div #[strong Current Experience:] {{ character.experiencePoints }}
    v-expansion-panels(accordion, :value="0")
      v-expansion-panel(v-for="(myClass, index) in currentClasses", :key="myClass.name")
        v-expansion-panel-header
          div.d-flex.align-center
            h4 {{ getClassTitle(myClass) }}
            span(v-if="(index === 0) && currentClasses.length > 1").grey--text.pl-3.text-caption Starting Class
        v-expansion-panel-content
          CharacterBuilderClass(
            v-bind="{ character, myClass, classes, features, index, isFixedHitPoints, characterAdvancements }",
            @saveFeatureConfig="fc => $emit('saveFeatureConfig', fc)"
            @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
            @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)",
            @replaceCharacterProperties="payload => $emit('replaceCharacterProperties', payload)",
            @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
          )
    CharacterBuilderClassNew(v-bind="{ classes, currentClasses, currentLevel }", @add="handleAddClass")
</template>
