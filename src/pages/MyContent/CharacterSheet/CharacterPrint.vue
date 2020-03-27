<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { namespace } from 'vuex-class'
  import addPlus from '@/utilities/addPlus'
  import { chain } from 'lodash'
  import BackButton from '@/components/BackButton.vue'

  const characterModule = namespace('character')

  interface field {
    top: Number,
    left: Number,
    width?: Number,
    fontSize?: Number,
    myClass?: String,
    text?: String | Number
  }

  @Component({
  components: {
      BackButton
    }
  })
  export default class CharacterPrint extends Vue {
    @characterModule.Getter completeCharacter!: CompleteCharacterType

    playerName = 'Tyrzaphir'

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

    isProficient (proficiency: string) {
      if (proficiency === 'proficient') return this.myClasses.dot
      else if (proficiency === 'expertise') return this.myClasses.diamond
      else return ''
    }

    setStyle ({ top, left, width, fontSize }: field) {
      return {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        ...(fontSize ? { 'font-size': fontSize + 'px' } : {})
      }
    }

    print () {
      window.print()
    }

    get pages (): field[][] {
      return [
        [
          // Top Box
          { top: 99, left: 77, width: 235, fontSize: 16, myClass: 'text-left', text: this.completeCharacter.name },
          { top: 52, left: 357, width: 240, myClass: 'text-left', text: this.completeCharacter.classText },
          { top: 52, left: 602, width: 127, myClass: 'text-left', text: this.completeCharacter.alignment },
          { top: 77, left: 357, width: 240, myClass: 'text-left', text: this.completeCharacter.species },
          { top: 77, left: 602, width: 127, myClass: 'text-left', text: this.completeCharacter.background },
          { top: 102, left: 357, width: 122, myClass: 'text-left', text: this.completeCharacter.experiencePoints.current },
          { top: 102, left: 484, width: 113, myClass: 'text-left', text: this.completeCharacter.experiencePoints.nextLevel },
          { top: 102, left: 602, width: 127, myClass: 'text-left', text: this.playerName },

          // Strength
          { top: 168, left: 81, width: 48, fontSize: 20, text: addPlus(this.completeCharacter.abilityScores.Strength.modifier) },
          { top: 200, left: 88, width: 34, fontSize: 16, text: this.completeCharacter.abilityScores.Strength.value },
          { top: 187, left: 146, myClass: this.isProficient(this.completeCharacter.abilityScores.Strength.savingThrow.proficiency) },
          { top: 179, left: 164, width: 23, text: addPlus(this.completeCharacter.abilityScores.Strength.savingThrow.modifier) },
          { top: 207, left: 138, myClass: this.isProficient(this.skillsMap.Athletics.proficiency) },
          { top: 200, left: 164, width: 23, text: addPlus(this.skillsMap.Athletics.modifier) },

          // Dexterity
          { top: 241, left: 81, width: 48, fontSize: 20, text: addPlus(this.completeCharacter.abilityScores.Dexterity.modifier) },
          { top: 273, left: 88, width: 34, fontSize: 16, text: this.completeCharacter.abilityScores.Dexterity.value },
          { top: 261, left: 146, myClass: this.isProficient(this.completeCharacter.abilityScores.Dexterity.savingThrow.proficiency) },
          { top: 253, left: 164, width: 23, text: addPlus(this.completeCharacter.abilityScores.Dexterity.savingThrow.modifier) },
          { top: 280, left: 138, myClass: this.isProficient(this.skillsMap.Acrobatics.proficiency) },
          { top: 272, left: 164, width: 23, text: addPlus(this.skillsMap.Acrobatics.modifier) },
          { top: 298, left: 138, myClass: this.isProficient(this.skillsMap['Sleight of Hand'].proficiency) },
          { top: 290, left: 164, width: 23, text: addPlus(this.skillsMap['Sleight of Hand'].modifier) },
          { top: 316, left: 138, myClass: this.isProficient(this.skillsMap.Stealth.proficiency) },
          { top: 307, left: 164, width: 23, text: addPlus(this.skillsMap.Stealth.modifier) },

          // Constitution
          { top: 336, left: 81, width: 48, fontSize: 20, text: addPlus(this.completeCharacter.abilityScores.Constitution.modifier) },
          { top: 368, left: 88, width: 34, fontSize: 16, text: this.completeCharacter.abilityScores.Constitution.value },
          { top: 357, left: 146, myClass: this.isProficient(this.completeCharacter.abilityScores.Constitution.savingThrow.proficiency) },
          { top: 348, left: 164, width: 23, text: addPlus(this.completeCharacter.abilityScores.Constitution.savingThrow.modifier) },

          // Intelligence
          { top: 410, left: 81, width: 48, fontSize: 20, text: addPlus(this.completeCharacter.abilityScores.Intelligence.modifier) },
          { top: 442, left: 88, width: 34, fontSize: 16, text: this.completeCharacter.abilityScores.Intelligence.value },
          { top: 430, left: 146, myClass: this.isProficient(this.completeCharacter.abilityScores.Intelligence.savingThrow.proficiency) },
          { top: 421, left: 164, width: 23, text: addPlus(this.completeCharacter.abilityScores.Intelligence.savingThrow.modifier) },
          { top: 450, left: 138, myClass: this.isProficient(this.skillsMap.Investigation.proficiency) },
          { top: 441, left: 164, width: 23, text: addPlus(this.skillsMap.Investigation.modifier) },
          { top: 467, left: 138, myClass: this.isProficient(this.skillsMap.Lore.proficiency) },
          { top: 459, left: 164, width: 23, text: addPlus(this.skillsMap.Lore.modifier) },
          { top: 484, left: 138, myClass: this.isProficient(this.skillsMap.Nature.proficiency) },
          { top: 476, left: 164, width: 23, text: addPlus(this.skillsMap.Nature.modifier) },
          { top: 502, left: 138, myClass: this.isProficient(this.skillsMap.Piloting.proficiency) },
          { top: 493, left: 164, width: 23, text: addPlus(this.skillsMap.Piloting.modifier) },
          { top: 519, left: 138, myClass: this.isProficient(this.skillsMap.Technology.proficiency) },
          { top: 511, left: 164, width: 23, text: addPlus(this.skillsMap.Technology.modifier) },

          // Wisdom
          { top: 541, left: 81, width: 48, fontSize: 20, text: addPlus(this.completeCharacter.abilityScores.Wisdom.modifier) },
          { top: 573, left: 88, width: 34, fontSize: 16, text: this.completeCharacter.abilityScores.Wisdom.value },
          { top: 561, left: 146, myClass: this.isProficient(this.completeCharacter.abilityScores.Wisdom.savingThrow.proficiency) },
          { top: 552, left: 164, width: 23, text: addPlus(this.completeCharacter.abilityScores.Wisdom.savingThrow.modifier) },
          { top: 580, left: 138, myClass: this.isProficient(this.skillsMap['Animal Handling'].proficiency) },
          { top: 571, left: 164, width: 23, text: addPlus(this.skillsMap['Animal Handling'].modifier) },
          { top: 598, left: 138, myClass: this.isProficient(this.skillsMap.Insight.proficiency) },
          { top: 589, left: 164, width: 23, text: addPlus(this.skillsMap.Insight.modifier) },
          { top: 615, left: 138, myClass: this.isProficient(this.skillsMap.Medicine.proficiency) },
          { top: 607, left: 164, width: 23, text: addPlus(this.skillsMap.Medicine.modifier) },
          { top: 632, left: 138, myClass: this.isProficient(this.skillsMap.Perception.proficiency) },
          { top: 624, left: 164, width: 23, text: addPlus(this.skillsMap.Perception.modifier) },
          { top: 650, left: 138, myClass: this.isProficient(this.skillsMap.Survival.proficiency) },
          { top: 641, left: 164, width: 23, text: addPlus(this.skillsMap.Survival.modifier) },

          // Charisma
          { top: 671, left: 81, width: 48, fontSize: 20, text: addPlus(this.completeCharacter.abilityScores.Charisma.modifier) },
          { top: 703, left: 88, width: 34, fontSize: 16, text: this.completeCharacter.abilityScores.Charisma.value },
          { top: 691, left: 146, myClass: this.isProficient(this.completeCharacter.abilityScores.Charisma.savingThrow.proficiency) },
          { top: 682, left: 164, width: 23, text: addPlus(this.completeCharacter.abilityScores.Charisma.savingThrow.modifier) },
          { top: 710, left: 138, myClass: this.isProficient(this.skillsMap.Deception.proficiency) },
          { top: 702, left: 164, width: 23, text: addPlus(this.skillsMap.Deception.modifier) },
          { top: 728, left: 138, myClass: this.isProficient(this.skillsMap.Intimidation.proficiency) },
          { top: 719, left: 164, width: 23, text: addPlus(this.skillsMap.Intimidation.modifier) },
          { top: 746, left: 138, myClass: this.isProficient(this.skillsMap.Performance.proficiency) },
          { top: 737, left: 164, width: 23, text: addPlus(this.skillsMap.Performance.modifier) },
          { top: 763, left: 138, myClass: this.isProficient(this.skillsMap.Persuasion.proficiency) },
          { top: 755, left: 164, width: 23, text: addPlus(this.skillsMap.Persuasion.modifier) },

          // Combat
          { top: 155, left: 302, width: 42, fontSize: 20, text: addPlus(this.completeCharacter.proficiencyBonus) },
          { top: 154, left: 535, width: 37, fontSize: 20, text: addPlus(this.completeCharacter.initiative) },
          { top: 203, left: 306, width: 41, fontSize: 20, text: this.completeCharacter.armorClass },
          { top: 210, left: 665, width: 64, fontSize: 20, text: this.completeCharacter.hitPoints.maximum }
        ],
        [],
        [],
        []
      ]
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    div(:class="$style.playerInput").d-flex.align-center
      v-text-field(v-model="playerName", label="Player Name", outlined, width="100").mr-4
      v-btn(color="primary", @click="print").d-print-none.mb-5
        v-icon.mr-2 fa-print
        | Print
    div(v-for="(fields, pageNumber) in pages", :class="$style.page")
      img(:src="require(`@/assets/CharacterSheets/CharacterSheetPage${pageNumber + 1}.png`)", :class="$style.template")
      div(v-for="field in fields", :class="[$style.text, field.myClass]", :style="setStyle(field)") {{ field.text }}
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .playerInput {
    max-width: 300px;
    margin: auto;
  }

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
      // border: 1px solid red;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
      font-size: 12px;

      &.dot, &.diamond::before {
        background-color: $black;
        border-radius: 100px;
        width: 8px;
        height: 8px;
        font-size: 6px;
      }

      &.diamond {
        height: 13px;
        width: 27px;
        transform: translate(-2px, -2px);

        &::before {
          content: '.';
          display: inline-block;
          transform: translate(-4px, -5px);
        }

        &::after {
          background-color: $black;
          width: 7px;
          height: 7px;
          font-size: 6px;
          transform: translate(3px, -4px) rotate(45deg) ;
          display: inline-block;
          content: '.';
        }
      }
    }
  }
</style>
