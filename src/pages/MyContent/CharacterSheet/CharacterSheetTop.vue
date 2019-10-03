<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import CharacterSheetHealth from './CharacterSheetHealth.vue'

  @Component({
    components: {
      CharacterSheetHealth
    }
  })
  export default class CharacterSheetTop extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType

    get classText () {
      return this.completeCharacter.species + ' ' + this.completeCharacter.classes
        .map(({ name, levels, archetype }) => {
          const archetypeText = archetype ? ` (${archetype})` : ''
          return `${name}${archetypeText} ${levels}`
        })
        .join(', ')
    }

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
  }
</script>

<template lang="pug">
  v-card.px-3.d-flex.justify-space-around.flex-wrap.align-center
    div.d-flex.align-center
      v-img(:src="completeCharacter.image", contain, max-height="90", max-width="90", min-width="100")
      div.text-left
        h1 {{ completeCharacter.name }}
        h5 {{ classText }}
        div(:class="$style.xpBar").d-flex.align-center
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
    CharacterSheetHealth(
      :hitPoints="completeCharacter.hitPoints",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
    )
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';
  .xpBar {
    width: 300px;

    .rightChip {
      opacity: 0.3
    }
  }
</style>
