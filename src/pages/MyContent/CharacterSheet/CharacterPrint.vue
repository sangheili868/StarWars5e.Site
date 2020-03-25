<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { namespace } from 'vuex-class'
  import addPlus from '@/utilities/addPlus'
  import { chain } from 'lodash'

  const characterModule = namespace('character')

  interface field {
    top: Number,
    left: Number,
    width: Number,
    myClass?: String,
    text: String | Number
  }

  @Component
  export default class CharacterPrint extends Vue {
    @characterModule.Getter completeCharacter!: CompleteCharacterType

    print () {
      window.print()
    }

    get myClasses () {
      return ((this as any).$style) as { [key: string]: string }
    }

    get skillsMap () {
      return chain(this.completeCharacter.abilityScores)
        .values()
        .map('skills')
        .flatten()
        .groupBy('name')
        .mapValues(0)
        .value()
    }

    get pages (): field[][] {
      return [
        [
          { top: 99, left: 77, width: 235, myClass: 'text-left', text: this.completeCharacter.name },
          // Strength
          { top: 168, left: 81, width: 48, myClass: this.myClasses.big, text: addPlus(this.completeCharacter.abilityScores.Strength.modifier) },
          { top: 200, left: 88, width: 34, text: this.completeCharacter.abilityScores.Strength.value },
          { top: 179, left: 164, width: 23, myClass: 'caption', text: addPlus(this.completeCharacter.abilityScores.Strength.savingThrow.modifier) },
          { top: 200, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Athletics.modifier) },

          // Dexterity
          { top: 241, left: 81, width: 48, myClass: this.myClasses.big, text: addPlus(this.completeCharacter.abilityScores.Dexterity.modifier) },
          { top: 273, left: 88, width: 34, text: this.completeCharacter.abilityScores.Dexterity.value },
          { top: 253, left: 164, width: 23, myClass: 'caption', text: addPlus(this.completeCharacter.abilityScores.Dexterity.savingThrow.modifier) },
          { top: 272, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Acrobatics.modifier) },
          { top: 290, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap['Sleight of Hand'].modifier) },
          { top: 307, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Stealth.modifier) },

          // Constitution
          { top: 336, left: 81, width: 48, myClass: this.myClasses.big, text: addPlus(this.completeCharacter.abilityScores.Constitution.modifier) },
          { top: 368, left: 88, width: 34, text: this.completeCharacter.abilityScores.Constitution.value },
          { top: 348, left: 164, width: 23, myClass: 'caption', text: addPlus(this.completeCharacter.abilityScores.Constitution.savingThrow.modifier) },

          // Intelligence
          { top: 410, left: 81, width: 48, myClass: this.myClasses.big, text: addPlus(this.completeCharacter.abilityScores.Intelligence.modifier) },
          { top: 442, left: 88, width: 34, text: this.completeCharacter.abilityScores.Intelligence.value },
          { top: 421, left: 164, width: 23, myClass: 'caption', text: addPlus(this.completeCharacter.abilityScores.Intelligence.savingThrow.modifier) },
          { top: 441, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Investigation.modifier) },
          { top: 459, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Lore.modifier) },
          { top: 476, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Nature.modifier) },
          { top: 493, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Piloting.modifier) },
          { top: 511, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Technology.modifier) },

          // Wisdom
          { top: 541, left: 81, width: 48, myClass: this.myClasses.big, text: addPlus(this.completeCharacter.abilityScores.Wisdom.modifier) },
          { top: 573, left: 88, width: 34, text: this.completeCharacter.abilityScores.Wisdom.value },
          { top: 552, left: 164, width: 23, myClass: 'caption', text: addPlus(this.completeCharacter.abilityScores.Wisdom.savingThrow.modifier) },
          { top: 571, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap['Animal Handling'].modifier) },
          { top: 589, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Insight.modifier) },
          { top: 607, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Medicine.modifier) },
          { top: 624, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Perception.modifier) },
          { top: 641, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Survival.modifier) },

          // Charisma
          { top: 671, left: 81, width: 48, myClass: this.myClasses.big, text: addPlus(this.completeCharacter.abilityScores.Charisma.modifier) },
          { top: 703, left: 88, width: 34, text: this.completeCharacter.abilityScores.Charisma.value },
          { top: 682, left: 164, width: 23, myClass: 'caption', text: addPlus(this.completeCharacter.abilityScores.Charisma.savingThrow.modifier) },
          { top: 702, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Deception.modifier) },
          { top: 719, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Intimidation.modifier) },
          { top: 737, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Performance.modifier) },
          { top: 755, left: 164, width: 23, myClass: 'caption', text: addPlus(this.skillsMap.Persuasion.modifier) }
        ],
        [],
        [],
        []
      ]
    }

    setStyle ({ top, left, width }: field) {
      return {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px'
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
      div(v-for="field in fields", :class="[$style.text, field.myClass]", :style="setStyle(field)") {{ field.text }}
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .page {
    width: 8.5in;
    color: $black;
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
      text-align: center;

      &.big {
        font-size: 20px;
      }
    }
  }
</style>
