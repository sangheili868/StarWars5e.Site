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
      CharacterBuilderEquipment
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

    currentStep = 1

    created () {
      Promise.all([
        this.fetchClasses(),
        this.fetchEquipment(),
        this.fetchPowers(),
        this.fetchFeats(),
        this.fetchBackgrounds(),
        this.fetchSpecies()
      ]).then(this.createCharacter)
    }

    get steps () {
      return [ {},
        { name: 'Species', component: 'CharacterBuilderSpecies', props: { species: this.species } },
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
    }

    prevStep () {
      this.currentStep = Math.max(this.numSteps, 1)
    }
  }
</script>

<template lang="pug">
  div
    h1.pb-3 Character Builder
    div {{ character }}
    v-stepper(v-model="currentStep", alt-labels)
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
          v-btn(v-if="currentStep < numSteps", color="primary", @click="currentStep++") Continue
          v-btn(v-if="currentStep === numSteps", color="primary", to="characterSheet") Save and View My Character
          v-btn(v-if="currentStep > 1", text, @click="currentStep--") Back
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
