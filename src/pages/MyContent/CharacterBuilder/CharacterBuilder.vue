<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import CharactersViewSheet from '../CharactersViewSheet.vue'
  import CharacterBuilderSpecies from './CharacterBuilderSpecies.vue'
  import CharacterBuilderClasses from './CharacterBuilderClasses.vue'
  import CharacterBuilderAbilityScores from './CharacterBuilderAbilityScores.vue'
  import CharacterBuilderDescription from './CharacterBuilderDescription.vue'
  import CharacterBuilderEquipment from './CharacterBuilderEquipment.vue'
  import { CharacterValidationType } from '@/types/utilityTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { SpeciesType, ClassType, PowerType, FeatType, BackgroundType, ArchetypeType } from '@/types/characterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import { every } from 'lodash'

  const characterModule = namespace('character')
  const classesModule = namespace('classes')
  const archetypesModule = namespace('archetypes')
  const speciesModule = namespace('species')
  const equipmentModule = namespace('equipment')
  const powersModule = namespace('powers')
  const featsModule = namespace('feats')
  const backgroundsModule = namespace('backgrounds')
  const characterAdvancementsModule = namespace('characterAdvancements')
  const skillsModule = namespace('skills')
  const conditionsModule = namespace('conditions')

@Component({
  components: {
      CharactersViewSheet,
      CharacterBuilderSpecies,
      CharacterBuilderClasses,
      CharacterBuilderAbilityScores,
      CharacterBuilderDescription,
      CharacterBuilderEquipment
    }
  })
  export default class CharacterBuilder extends Vue {
    @Prop(Object) readonly character!: RawCharacterType
    @Prop(Object) readonly characterValidation!: CharacterValidationType
    @Prop(Number) readonly currentStep!: number
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly archetypes!: ArchetypeType[]
    @Prop(Array) readonly equipment!: EquipmentType[]
    @Prop(Array) readonly powers!: PowerType[]
    @Prop(Array) readonly feats!: FeatType[]
    @Prop(Array) readonly backgrounds!: BackgroundType[]
    @Prop(Array) readonly species!: SpeciesType[]

    get steps () {
      return [ {},
        {
          name: 'Species',
          component: 'CharacterBuilderSpecies',
          props: {
            species: this.species,
            currentSpecies: this.character.species
          },
          isComplete: this.character.species.name !== ''
        },
        {
          name: 'Class',
          component: 'CharacterBuilderClasses',
          props: {
            character: this.character,
            classes: this.classes
          },
          isComplete: this.character.classes.length > 0
        },
        {
          name: 'Ability Scores',
          component: 'CharacterBuilderAbilityScores',
          props: {
            abilityScoreMethod: this.character.settings.abilityScoreMethod,
            currentScores: this.character.baseAbilityScores
          },
          isComplete: every(this.character.baseAbilityScores, score => score > 0)
        },
        {
          name: 'Description',
          component: 'CharacterBuilderDescription',
          props: {
            currentBackground: this.character.background,
            backgrounds: this.backgrounds,
            name: this.character.name,
            image: this.character.image,
            characteristics: this.character.characteristics
          },
          isComplete: this.character.name !== '' &&
            this.character.background.name !== '' &&
            this.character.background.feat.name !== ''
        },
        {
          name: 'Equipment',
          component: 'CharacterBuilderEquipment',
          props: {
            rawCharacter: this.character
          },
          isComplete: this.character.equipment.length > 0
        }
      ]
    }

    get numSteps () {
      return this.steps.length - 1
    }

    nextStep () {
      this.$emit('goToStep', Math.min(this.numSteps, this.currentStep + 1))
    }

    prevStep () {
      this.$emit('goToStep', Math.max(this.currentStep - 1, 0))
    }
  }
</script>

<template lang="pug">
  div
    h1.pb-3 Character Builder (BETA)
    div.d-flex.justify-center
      div(v-if="currentStep === 0", :class="$style.page").text-left
        div This character builder is still in #[span.primary--text beta].
        | We are still working on lots of cool options and updates!
        | Here's a few things to be aware of:
        h2.mt-5 Character Features
        div.
          We have not translated #[span.primary--text class features, species features, etc.]
          into code that the character sheet can use. Until that is done, you can enter them as
          #[span.primary--text custom features] by copying the text into your character sheet,
          and make any adjustments to numbers as #[span.primary--text tweaks in the Settings menu.]
          You can also add custom proficiencies and expertise in the #[span.primary--text Proficiencies tab].
        div.mt-2.
          For example, it does not yet recognize that level 1 operatives gain expertise and sneak attack, so you cannot
          choose expertise skills in the character builder or see sneak attack in your list of features. However, in the
          proficiencies tab, you can give yourself expertise in the skills you choose. Then you can add a custom
          feature for Sneak Attack, copying the description from the operative page on this site.
        h2.mt-5 Saving Your Character
        div.
          We also have not yet implemented account management, so you cannot store characters on our servers. Until then, you will
          have to save your character to a #[span.primary--text file on your computer], and upload it to this site
          whenever you want to view it. #[span.primary--text No changes to your character are permanently saved] unless
          you download an updated file, including changes to hit points, force points, etc. Your character can be saved as a
          #[span.primary--text file] or #[span.primary--text text]. If you choose text, it is copied to your clipboard, and
          it must then be pasted somewhere you can access later.
        h2.mt-5 Feedback
        div.
          Because of the complexity and depth of SW5e, there is no way we can test every possible character. There are also
          lots of other features we plan to implement, like a dice roller and custom weapons and armor.
          Please report any bugs you find, or additional features you want to see, at the
          #[span.primary--text #website-character-builder] channel in our Discord server.
        div.mt-5.d-flex.flex-wrap.justify-space-around
          a(href="https://discord.gg/zYcPYTu", target="_blank").mb-5
            v-btn(light)
              v-icon(color="Discord").mr-3 fab fa-discord
              | Go to Discord Server
          v-btn(color="primary", @click="nextStep") Go to character builder
      v-stepper(v-else, :value="currentStep", :class="$style.page", @change="newStep => $emit('goToStep', newStep)")
        v-stepper-header
          template(v-for="n in numSteps")
            v-stepper-step(
              :key="`${n}-step`",
              :complete="steps[n].isComplete",
              :step="n",
              editable,
              edit-icon="fa-check"
            ) {{ steps[n].name }}
            v-divider(v-if="n !== numSteps", :key="n", :class="$style.divider")
        v-stepper-items
          v-stepper-content(v-for="n in numSteps" :key="`${n}-content`" :step="n")
            component(
              :is="steps[n].component",
              v-bind="steps[n].props",
              @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
              @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)",
              @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
              @replaceCharacterProperties="payload => $emit('replaceCharacterProperties', payload)"
            )
            div.d-flex.justify-space-around.flex-wrap.mt-5
              v-btn(v-if="currentStep > 0", outlined, @click="prevStep")
                v-icon.mr-2 fa-chevron-left
                | Back
              v-btn(v-if="currentStep < numSteps", color="primary", @click="nextStep") Continue
                v-icon.ml-2 fa-chevron-right
              CharactersViewSheet(v-else, v-bind="{ characterValidation }", @click="$emit('viewSheet')")
</template>

<style module lang="scss">
  .divider {
    visibility: visible;
  }

  .page {
    width: 1000px;
  }
</style>

<style lang="scss">
  .v-stepper .v-stepper__step__step .v-icon {
    font-size: 12px;
  }
</style>
