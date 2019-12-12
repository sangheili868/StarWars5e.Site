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

    updateExperience (newExperience: number) {
      const unspentLevels = this.calculateLevel(newExperience) - this.completeCharacter.currentLevel
      this.$emit('updateCharacter', { experiencePoints: newExperience, currentStats: { unspentLevels } })
      this.isExperienceOpen = false
    }
  }
</script>

<template lang="pug">
  ValueEditor(:value="completeCharacter.experiencePoints.current", label="Experience", @input="updateExperience")
    div(:class="$style.xpBar").d-flex.align-center
      v-chip(small, color="secondary", text-color="white").mr-2.ml-0
        h5 {{ completeCharacter.currentLevel }}
      v-progress-linear(
        :value="percentExperience",
        rounded,
        color="secondary",
        height="20"
      ).text-center.ma-0
        h5 {{ experienceText }}
      v-chip(small, color="secondary", text-color="white", :class="$style.rightChip").ml-2.mr-0
        h5 {{ completeCharacter.currentLevel + 1 }}
    template(v-slot:result="{ newValue }")
      div New Experience: {{ newValue }}
      div New Level: {{ calculateLevel(newValue) }}
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';
  .xpBar {
    min-width: 250px;

    .rightChip {
      opacity: 0.3
    }
  }
</style>
