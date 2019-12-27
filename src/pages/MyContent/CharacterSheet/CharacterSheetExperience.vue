<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { startCase, chain } from 'lodash'
  import ValueEditor from '@/components/ValueEditor.vue'
  import { CharacterAdvancementType } from '@/types/lookupTypes'

  const characterAdvancementsModule = namespace('characterAdvancements')

  @Component({
    components: {
      ValueEditor
    }
  })
  export default class CharacterSheetExperience extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    @characterAdvancementsModule.State characterAdvancements!: CharacterAdvancementType[]
    @characterAdvancementsModule.Action fetchCharacterAdvancements!: () => void

    isExperienceOpen = false
    newValue = 0
    startCase = startCase

    created () {
      this.fetchCharacterAdvancements()
    }

    get percentExperience () {
      const xp = this.completeCharacter.experiencePoints
      return 100 * (xp.current - xp.previousLevel) / (xp.nextLevel - xp.previousLevel)
    }

    get experienceText () {
      return `${this.completeCharacter.experiencePoints.current} / ${this.completeCharacter.experiencePoints.nextLevel}`
    }

    calculateLevel (experience: number) {
      const level = chain(this.characterAdvancements)
        .sortBy('experiencePoints')
        .findIndex(({ experiencePoints }) => experiencePoints > experience)
        .value()
      return level < 0 ? 20 : level
    }

    getNextAdvancement (experience: number) {
      const advancement = chain(this.characterAdvancements)
        .sortBy('experiencePoints')
        .find(({ experiencePoints }) => experiencePoints > experience)
        .value()
      return advancement || {
        level: 20,
        experiencePoints: 355000
      }
    }

    updateExperience (newExperience: number) {
      const unspentLevels = this.calculateLevel(newExperience) - this.completeCharacter.currentLevel
      this.$emit('updateCharacter', { experiencePoints: newExperience, currentStats: { unspentLevels } })
      this.isExperienceOpen = false
    }
  }
</script>

<template lang="pug">
  v-badge(overlap).my-3.mr-3
    template(v-slot:badge, v-if="!completeCharacter.experiencePoints.isCorrect") !
    ValueEditor(:value="completeCharacter.experiencePoints.current", label="Experience", @input="updateExperience")
      div.d-flex.align-center.xpBar
        v-chip(small, color="secondary", text-color="white").mr-2.ml-0
          h5 {{ completeCharacter.currentLevel }}
        v-progress-linear(
          :value="percentExperience",
          rounded,
          color="secondary",
          height="20"
        ).text-center.ma-0
          h5 {{ experienceText }}
        v-chip(v-if="completeCharacter.currentLevel < 20", small, color="secondary", text-color="white").ml-2.mr-0.rightChip
          h5 {{ completeCharacter.currentLevel + 1 }}
      template(v-slot:result="{ newValue }")
        div New Level: {{ calculateLevel(newValue) }} ({{ newValue }} experience points)
        div Next Level: {{ getNextAdvancement(newValue).level }} ({{ getNextAdvancement(newValue).experiencePoints }} experience Points)
        div.primary--text {{ completeCharacter.experiencePoints.errorMessage }}
        v-btn(color="primary", @click="$emit('goToStep', 2)").mt-3 Manage Class Levels
</template>

<style lang="scss">
  @import '@/assets/styles/colors.scss';
  .xpBar {
    min-width: 250px;

    .v-chip__content {
      display: flex;
      justify-content: center;
    }

    .rightChip {
      opacity: 0.3
    }
  }
</style>
