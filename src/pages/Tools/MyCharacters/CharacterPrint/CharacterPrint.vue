<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { namespace } from 'vuex-class'
  import BackButton from '@/components/BackButton.vue'
  import CharacterPrintPage1 from './CharacterPrintPage1'
  import CharacterPrintPage2 from './CharacterPrintPage2'
  import CharacterPrintPage3 from './CharacterPrintPage3'
  import CharacterPrintPage4 from './CharacterPrintPage4'
  import { printFieldType } from '@/types/utilityTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'

  const characterModule = namespace('character')

  @Component({
  components: {
      BackButton
    }
  })
  export default class CharacterPrint extends Vue {
    @Prop(String) readonly characterId!: string
    @characterModule.Getter generateCompleteCharacter!: (rawCharacter: RawCharacterType) => CompleteCharacterType | null
    @characterModule.Getter getCharacterById!: (characterId: string) => RawCharacterType | undefined

    playerName = ''

    get myClasses () {
      return ((this as any).$style) as { [key: string]: string }
    }

    get completeCharacter (): CompleteCharacterType | null {
      const rawCharacter = this.getCharacterById(this.characterId)
      return rawCharacter ? this.generateCompleteCharacter(rawCharacter) : null
    }

    get pages (): printFieldType[][] {
      return this.completeCharacter ? [
        CharacterPrintPage1(this.completeCharacter, this.myClasses, this.playerName),
        CharacterPrintPage2(this.completeCharacter, this.myClasses),
        CharacterPrintPage3(this.completeCharacter, this.myClasses),
        ...CharacterPrintPage4(this.completeCharacter)
      ] : []
    }

    setStyle ({ top, left, width, height, fontSize }: printFieldType) {
      return {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px',
        ...(fontSize ? { 'font-size': fontSize + 'px' } : {})
      }
    }

    print () {
      window.print()
    }
  }
</script>

<template lang="pug">
  div
    BackButton(:label="completeCharacter.name").d-print-none
    template(v-if="completeCharacter")
      div(:class="$style.playerInput").d-flex.align-center.d-print-none
        v-text-field(v-model="playerName", label="Player Name", outlined, width="100").mr-4
        v-btn(color="primary", @click="print").mb-5
          v-icon.mr-2 fa-print
          | Print
      div.d-print-none.caption.text-left Known Issues:
        ul
          li Fields have limited space and can be cut off (especially Features)
          li Size and vision are missing
          li Only feats show up in the combat features list
          li All items are either equipped or in the backpack
          li There is an extra blank page
      div(v-for="(fields, pageNumber) in pages", :class="$style.page")
        img(:src="require(`@/assets/CharacterSheets/CharacterSheetPage${pageNumber + 1}.png`)", :class="$style.template")
        div(v-for="field in fields", :class="[$style.text, field.myClass]", :style="setStyle(field)") {{ field.text }}
    div(v-else) No character loaded
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

      &.openSans {
        font-family: 'Open Sans', sans-serif;
      }

      &.multiline {
        text-align: left;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: pre-wrap;
        font-size: 11px;
        font-family: 'Open Sans', sans-serif;
      }

      &.dot, &.diamond::before {
        background-color: $black;
        border-radius: 100px;
        width: 8px;
        height: 8px;
        font-size: 6px;
        -webkit-print-color-adjust: exact;
      }

      &.diamond {
        height: 13px;
        width: 27px;
        transform: translate(-2px, -2px);
        -webkit-print-color-adjust: exact;

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
