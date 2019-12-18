<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import CharacterBuilderSpecies from './CharacterBuilderSpecies.vue'
  import CharacterBuilderClasses from './CharacterBuilderClasses.vue'
  import CharacterBuilderAbilityScores from './CharacterBuilderAbilityScores.vue'
  import CharacterBuilderDescription from './CharacterBuilderDescription.vue'
  import CharacterBuilderEquipment from './CharacterBuilderEquipment.vue'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { SpeciesType, ClassType, PowerType, FeatType, BackgroundType, ArchetypeType } from '@/types/characterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import Loading from '@/components/Loading.vue'
  import CharacterBuilderSaveView from './CharacterBuilderSaveView.vue'
  import { CharacterValidationType } from '@/types/utilityTypes'

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
      CharacterBuilderSpecies,
      CharacterBuilderClasses,
      CharacterBuilderAbilityScores,
      CharacterBuilderDescription,
      CharacterBuilderEquipment,
      Loading,
      CharacterBuilderSaveView
    }
  })
  export default class CharacterBuilder extends Vue {
    @Prop(String) readonly new!: string
    @Prop(String) readonly page!: string

    @characterModule.State character!: RawCharacterType
    @characterModule.Getter characterValidation!: CharacterValidationType
    @characterModule.Action setClean!: () => void
    @characterModule.Action createCharacter!: () => void
    @characterModule.Action updateCharacter!: (newCharacter: RawCharacterType) => void
    @characterModule.Action replaceCharacterProperty!: (payload: { path: string, property: any }) => void
    @characterModule.Action replaceCharacterProperties!: (replacements: { path: string, property: any }[]) => void
    @characterModule.Action deleteCharacterProperty!: (payload: { path: string, index: number }) => void

    @classesModule.State classes!: ClassType[]
    @classesModule.Action fetchClasses!: () => void
    @archetypesModule.State archetypes!: ArchetypeType[]
    @archetypesModule.Action fetchArchetypes!: () => void
    @equipmentModule.State equipment!: EquipmentType[]
    @equipmentModule.Action fetchEquipment!: () => void
    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void
    @featsModule.State feats!: FeatType[]
    @featsModule.Action fetchFeats!: () => void
    @backgroundsModule.State backgrounds!: BackgroundType[]
    @backgroundsModule.Action fetchBackgrounds!: () => void
    @speciesModule.State species!: SpeciesType[]
    @speciesModule.Action fetchSpecies!: () => void

    currentStep = 1
    isReady = false

    created () {
      if (this.new === 'true') this.currentStep = 0
      else if (this.page) this.currentStep = parseInt(this.page)
      Promise.all([
        this.fetchClasses(),
        this.fetchArchetypes(),
        this.fetchEquipment(),
        this.fetchPowers(),
        this.fetchFeats(),
        this.fetchBackgrounds(),
        this.fetchSpecies()
      ])
        .then(() => { if (this.new === 'true') this.createCharacter() })
        .then(() => { this.isReady = true })
    }

    get steps () {
      return [ {},
        {
          name: 'Species',
          component: 'CharacterBuilderSpecies',
          props: {
            species: this.species,
            currentSpecies: this.character.species
          }
        },
        {
          name: 'Class',
          component: 'CharacterBuilderClasses',
          props: {
            character: this.character,
            classes: this.classes
          }
        },
        {
          name: 'Ability Scores',
          component: 'CharacterBuilderAbilityScores',
          props: {
            abilityScoreMethod: this.character.settings.abilityScoreMethod,
            currentScores: this.character.baseAbilityScores
          }
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
          }
        },
        {
          name: 'Equipment',
          component: 'CharacterBuilderEquipment',
          props: {
            rawCharacter: this.character
          }
        }
      ]
    }

    get numSteps () {
      return this.steps.length - 1
    }

    nextStep () {
      this.currentStep = Math.min(this.numSteps, this.currentStep + 1)
      window.scrollTo(0, 0)
    }

    prevStep () {
      this.currentStep = Math.max(this.currentStep - 1, 0)
      window.scrollTo(0, 0)
    }
  }
</script>

<template lang="pug">
  div
    h1.pb-3 Character Builder (BETA)
    div(v-if="currentStep === 0").d-flex.justify-center
      div(:class="$style.pageZero").text-left
        div This character builder is still in #[span.primary--text beta].
        | We are still working on lots of cool options and updates!
        | Here's a few things to be aware of:
        h2.mt-5 Character Features
        div.
          We have not translated #[span.primary--text class features, species features, feats, etc.]
          into code that the character sheet can use. Until that is done, you can enter them as
          #[span.primary--text custom features] by copying the text into your character sheet,
          and make any adjustments to numbers as #[span.primary--text tweaks in the Settings menu.]
          You can also add custom proficiencies and expertise in the #[span.primary--text Proficiencies Tab]
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
          you download an updated file, including changes to hit points, force points, etc.
        h2.mt-5 Feedback
        div.
          Because of the complexity and depth of SW5e, there is no way we can test every possible character. Please report
          any bugs you find, or additional features you want to see, at the
          #[span.primary--text #website-character-builder] channel in our Discord server.
        div.mt-5.d-flex.flex-wrap.justify-space-around
          a(href="https://discord.gg/zYcPYTu", target="_blank").mb-5
            v-btn(light)
              v-icon(color="Discord").mr-3 fab fa-discord
              | Go to Discord Server
          v-btn(color="primary", @click="currentStep = 1") Go to character builder
    v-stepper(v-else-if="isReady", v-model="currentStep")
      v-stepper-header
        template(v-for="n in numSteps")
          v-stepper-step(:key="`${n}-step`", :complete="currentStep > n", :step="n", editable) {{ steps[n].name }}
          v-divider(v-if="n !== numSteps", :key="n", :class="$style.divider")
      v-stepper-items
        v-stepper-content(v-for="n in numSteps" :key="`${n}-content`" :step="n")
          component(
            :is="steps[n].component",
            v-bind="steps[n].props",
            v-on="{ updateCharacter, replaceCharacterProperty, replaceCharacterProperties, deleteCharacterProperty }"
          )
          div.d-flex.justify-space-around.flex-wrap.mt-5
            v-btn(v-if="currentStep > 0", outlined, @click="prevStep")
              v-icon.mr-2 fa-chevron-left
              | Back
            CharacterBuilderSaveView(v-bind="{ character, characterValidation }", @save="setClean").hidden-sm-and-down
            v-btn(v-if="currentStep < numSteps", color="primary", @click="nextStep") Continue
              v-icon.ml-2 fa-chevron-right
          div.d-flex.justify-center.flex-wrap.mt-2
            CharacterBuilderSaveView(v-bind="{ character, characterValidation }", @save="setClean").hidden-md-and-up
    Loading(v-else)
</template>

<style module lang="scss">
  .divider {
    visibility: visible;
  }

  .pageZero {
    max-width: 700px;
  }
</style>

<style lang="scss">
  .v-stepper .v-stepper__step__step .v-icon {
    font-size: 12px;
  }
</style>
