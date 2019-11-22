<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import CharacterBuilderSpecies from './CharacterBuilderSpecies.vue'
  import CharacterBuilderClass from './CharacterBuilderClass.vue'
  import CharacterBuilderAbilityScores from './CharacterBuilderAbilityScores.vue'
  import CharacterBuilderDescription from './CharacterBuilderDescription.vue'
  import CharacterBuilderEquipment from './CharacterBuilderEquipment.vue'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { SpeciesType, ClassType, PowerType, FeatType, BackgroundType } from '@/types/characterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import Loading from '@/components/Loading.vue'

  const speciesModule = namespace('species')
  const characterModule = namespace('character')
  const classesModule = namespace('classes')
  const equipmentModule = namespace('equipment')
  const powersModule = namespace('powers')
  const featsModule = namespace('feats')
  const backgroundsModule = namespace('backgrounds')

@Component({
  components: {
      CharacterBuilderSpecies,
      CharacterBuilderClass,
      CharacterBuilderAbilityScores,
      CharacterBuilderDescription,
      CharacterBuilderEquipment,
      Loading
    }
  })
  export default class CharacterBuilder extends Vue {
    @characterModule.State character!: RawCharacterType
    @characterModule.Action createCharacter!: () => void
    @characterModule.Getter completeCharacter!: CompleteCharacterType
    @characterModule.Action updateCharacter!: (newCharacter: RawCharacterType) => void
    @classesModule.State classes!: ClassType[]
    @classesModule.Action fetchClasses!: () => void
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

    currentStep = 0
    isReady = false

    created () {
      Promise.all([
        this.fetchClasses(),
        this.fetchEquipment(),
        this.fetchPowers(),
        this.fetchFeats(),
        this.fetchBackgrounds(),
        this.fetchSpecies()
      ])
        .then(this.createCharacter)
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
          component: 'CharacterBuilderClass',
          props: {
            classes: this.classes,
            currentClasses: this.character.classes
          }
        },
        {
          name: 'Ability Scores',
          component: 'CharacterBuilderAbilityScores',
          props: {
            currentScores: this.character.baseAbilityScores
          }
        },
        {
          name: 'Description',
          component: 'CharacterBuilderDescription',
          props: {
            currentBackground: this.character.background,
            backgrounds: this.backgrounds
          }
        },
        { name: 'Equipment', component: 'CharacterBuilderEquipment' }
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
    div(v-if="currentStep === 0")
      div This character builder is in #[span.primary--text beta]. We are still working on lots of cool options and features!
      div The next big step is letting you create an account to store characters on our servers.
      div.
        Until then, you will have to save your character to a
        #[span.primary--text file on your computer],
        and upload it to this site whenever you want to view it
      div #[span.primary--text Nothing is saved] unless you download the file, including hit points, force points, etc.
      div.
        Please report any bugs you find, or features you want to see, at the
        #[span.primary--text #website-character-builder]
        channel in our discord server.
      div.mt-5.d-flex.flex-wrap.justify-space-around
        a(href="https://discord.gg/zYcPYTu", target="_blank").mb-5
          v-btn(light)
            v-icon(color="Discord").mr-3 fab fa-discord
            | Go to Discord Server
        v-btn(color="primary", @click="currentStep = 1") Go to character builder
    v-stepper(v-else-if="isReady", v-model="currentStep", alt-labels)
      v-stepper-header
        template(v-for="n in numSteps")
          v-stepper-step(:key="`${n}-step`", :complete="currentStep > n", :step="n", editable) {{ steps[n].name }}
          v-divider(v-if="n !== numSteps", :key="n", :class="$style.divider")
      v-stepper-items
        v-stepper-content(v-for="n in numSteps" :key="`${n}-content`" :step="n")
          component(
            :is="steps[n].component",
            v-bind="steps[n].props",
            v-on="{ updateCharacter }"
          )
          v-btn(v-if="currentStep < numSteps", color="primary", @click="nextStep") Continue
          v-btn(v-if="currentStep === numSteps", color="primary", to="characterSheet") Save and View My Character
          v-btn(v-if="currentStep > 0", text, @click="prevStep") Back
    Loading(v-else)
    div.mt-5 {{ character }}

</template>

<style module lang="scss">
  .divider {
    visibility: visible;
  }
</style>

<style lang="scss">
  .v-stepper .v-stepper__step__step .v-icon {
    font-size: 12px;
  }
</style>
