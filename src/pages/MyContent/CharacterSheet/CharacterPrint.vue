<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { namespace } from 'vuex-class'

  const characterModule = namespace('character')

  interface field {
    top: Number,
    left: Number,
    width: Number,
    align: String,
    text: String | Number
  }

  @Component
  export default class CharacterPrint extends Vue {
    @characterModule.Getter completeCharacter!: CompleteCharacterType

    print () {
      window.print()
    }

    get pages (): field[][] {
      return [
        [
          { top: 99, left: 77, width: 235, align: 'left', text: this.completeCharacter.name },
          { top: 200, left: 88, width: 34, align: 'center', text: this.completeCharacter.abilityScores.Strength.value },
          { top: 273, left: 88, width: 34, align: 'center', text: this.completeCharacter.abilityScores.Dexterity.value },
          { top: 368, left: 88, width: 34, align: 'center', text: this.completeCharacter.abilityScores.Constitution.value },
          { top: 442, left: 88, width: 34, align: 'center', text: this.completeCharacter.abilityScores.Intelligence.value },
          { top: 573, left: 88, width: 34, align: 'center', text: this.completeCharacter.abilityScores.Wisdom.value },
          { top: 703, left: 88, width: 34, align: 'center', text: this.completeCharacter.abilityScores.Charisma.value }
        ],
        [],
        [],
        []
      ]
    }

    setStyle ({ top, left, width, align }: field) {
      return {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        'text-align': align
      }
    }
  }
</script>

<template lang="pug">
  div
    v-btn(color="primary", @click="print").d-print-none.mb-5
      v-icon.mr-2 fa-print
      | Print
    div(v-for="(fields, pageNumber) in pages", :class="$style.page")
      img(:src="require(`@/assets/CharacterSheets/CharacterSheetPage${pageNumber + 1}.png`)", :class="$style.template")
      div(v-for="field in fields", :class="$style.text", :style="setStyle(field)") {{ field.text }}
</template>

<style module lang="scss">
  .page {
    width: 8.5in;
    color: black;
    position: relative;
    margin: auto;

    .template {
      max-width: 100%
    }

    .text {
      position: absolute;
      font-family: 'Russo One', sans-serif;
      text-transform: capitalize;
      border: 1px solid red;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
