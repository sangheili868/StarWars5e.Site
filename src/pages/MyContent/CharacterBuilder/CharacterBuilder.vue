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
    @classesModule.Action fetchClasses!: () => void
    @equipmentModule.Action fetchEquipment!: () => void
    @powersModule.Action fetchPowers!: () => void
    @featsModule.Action fetchFeats!: () => void
    @backgroundsModule.Action fetchBackgrounds!: () => void

    currentStep = 1
    steps = [ {},
      { name: 'Species', component: 'CharacterBuilderSpecies' },
      { name: 'Class', component: 'CharacterBuilderClass' },
      { name: 'Ability Scores', component: 'CharacterBuilderAbilityScores' },
      { name: 'Description', component: 'CharacterBuilderDescription' },
      { name: 'Equipment', component: 'CharacterBuilderEquipment' }
    ]

    created () {
      Promise.all([
        this.fetchClasses,
        this.fetchEquipment,
        this.fetchPowers,
        this.fetchFeats,
        this.fetchBackgrounds
      ]).then(() => this.createCharacter)
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
    v-stepper(v-model="currentStep", alt-labels)
      v-stepper-header
        template(v-for="n in numSteps")
          v-stepper-step(:key="`${n}-step`", :complete="currentStep > n", :step="n", editable) {{ steps[n].name }}
          v-divider(v-if="n !== numSteps", :key="n", :class="$style.divider")
      v-stepper-items
        v-stepper-content(v-for="n in numSteps" :key="`${n}-content`" :step="n")
          component(:is="steps[n].component")
          v-btn(v-if="currentStep < numSteps", color="primary", @click="currentStep++") Continue
          v-btn(v-if="currentStep === numSteps", color="primary", @click="() => {}") Save and View My Character
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
