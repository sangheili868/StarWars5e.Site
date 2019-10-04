<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { experienceTable } from '@/test/gameData.json'
  import { startCase } from 'lodash'

  @Component
  export default class CharacterSheetExperience extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    isExperienceOpen = false
    newValue = 0
    startCase = startCase

    get percentExperience () {
      const xp = this.completeCharacter.experiencePoints
      return 100 * (xp.current - xp.previousLevel) / (xp.nextLevel - xp.previousLevel)
    }

    get experienceText () {
      return `${this.completeCharacter.experiencePoints.current} / ${this.completeCharacter.experiencePoints.nextLevel}`
    }

    get currentLevel () {
      return this.completeCharacter.classes.reduce((acc, { levels }) => acc + levels, 0)
    }

    get experienceCalculations () {
      const addExperience = this.fixExperience(this.completeCharacter.experiencePoints.current + this.newValue)
      const setExperience = this.fixExperience(this.newValue)
      const setLevel = this.fixLevel(this.newValue)
      return {
        addExperience: { newExperience: addExperience, newLevel: this.calculateLevel(addExperience) },
        setLevel: { newExperience: this.calculateExperience(setLevel), newLevel: setLevel },
        setExperience: { newExperience: setExperience, newLevel: this.calculateLevel(setExperience) }
      }
    }

    fixExperience (experience: number) {
      return Math.max(0, experience)
    }

    fixLevel (level: number) {
      return Math.min(20, Math.max(1, level))
    }

    calculateLevel (experience: number) {
      const level = experienceTable.findIndex(threshold => threshold > experience) - 1
      return level < 0 ? 20 : level
    }

    calculateExperience (level: number) {
      return experienceTable[level]
    }

    resetExperience () {
      this.newValue = 0
    }

    setExperience () {
      // this.$emit('updateCharacter', { experiencePoints: this.newExperience })
      this.isExperienceOpen = false
    }
  }
</script>

<template lang="pug">
  v-dialog(v-model="isExperienceOpen", width="500")
    template(v-slot:activator="{ on }")
      v-btn(:class="$style.xpBar", v-on="on", @click="resetExperience").d-flex.align-center
        v-chip(small, color="secondary", text-color="white").mr-2.ml-0
          h5 {{ currentLevel }}
        v-progress-linear(
          :value="percentExperience",
          rounded,
          color="secondary",
          height="20"
        ).text-center.ma-0
          h5 {{ experienceText }}
        v-chip(small, color="secondary", text-color="white", :class="$style.rightChip").ml-2.mr-0
          h5 {{ currentLevel + 1 }}
    v-card(:class="$style.modal")
      v-card-title(primary-title).primary--text.headline.grey.lighten-2 Adjust Experience
      v-card-text
        v-container
          v-row
            v-col(cols="6")
              v-text-field(outlined, type="number", v-model.number="newValue", background-color="white")
            v-col(cols="6")
              div Current Level: {{ currentLevel }}
              div Current Experience: {{ completeCharacter.experiencePoints.current }}
              div Next Level: {{ fixLevel(currentLevel + 1) }}
              div Next Level Experience: {{ completeCharacter.experiencePoints.nextLevel }}
          v-row(v-for="action in ['addExperience', 'setExperience', 'setLevel']", :key="action")
            v-col(cols="6")
              v-btn(color="primary", block) {{ startCase(action) }}
            v-col(cols="6")
              div New Level: {{ experienceCalculations[action].newLevel }}
              div New Experience: {{ experienceCalculations[action].newExperience }}
      v-card-actions
        v-spacer
        v-btn(color="primary", text, @click="isExperienceOpen=false") Close
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';
  .xpBar {
    width: 300px;

    .rightChip {
      opacity: 0.3
    }
  }

  .modal {
    background: $backgroundGradient;
  }
</style>
