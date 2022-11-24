<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterBuilder from './CharacterBuilder/CharacterBuilder.vue'
  import CharacterSheet from './CharacterSheet/CharacterSheet.vue'
  import Loading from '@/components/Loading.vue'
  import { namespace } from 'vuex-class'
  import { merge, get, set, camelCase, omit, uniqueId } from 'lodash'
  import baseCharacter from '@/modules/CharacterEngine/baseCharacter.json'
  import builderVersion from '@/version'
  import BackButton from '@/components/BackButton.vue'

  import { ClassType, ArchetypeType, PowerType, FeatType, BackgroundType, SpeciesType, FeatureType } from '@/types/characterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import { CompleteCharacterType, CompletedFeatureType } from '@/types/completeCharacterTypes'
  import { FeatureConfigType, RawCharacterType } from '@/types/rawCharacterTypes'
  import { CharacterValidationType } from '@/types/utilityTypes'

  const characterModule = namespace('character')
  const classesModule = namespace('classes')
  const archetypesModule = namespace('archetypes')
  const speciesModule = namespace('species')
  const equipmentModule = namespace('equipment')
  const powersModule = namespace('powers')
  const featsModule = namespace('feats')
  const featuresModule = namespace('features')
  const backgroundsModule = namespace('backgrounds')
  const characterAdvancementsModule = namespace('characterAdvancements')
  const skillsModule = namespace('skills')
  const conditionsModule = namespace('conditions')
  const enhancedItemsModule = namespace('enhancedItems')
  const authenticationModule = namespace('authentication')

  @Component({
    components: {
      CharacterBuilder,
      CharacterSheet,
      BackButton,
      Loading
    }
  })
  export default class Characters extends Vue {
    @Prop(String) readonly characterId!: string
    @Prop(String) readonly isNew!: string
    @characterModule.State characters!: RawCharacterType[]
    @characterModule.Getter generateCompleteCharacter!: (rawCharacter: RawCharacterType) => CompleteCharacterType | null
    @characterModule.Getter getCharacterById!: (characterId: string) => RawCharacterType | undefined
    @characterModule.Getter getIsEmptyCharacter!: (character: RawCharacterType | undefined) => boolean
    @characterModule.Getter getCharacterValidation!: (character: RawCharacterType | undefined) => CharacterValidationType
    @characterModule.Action saveCharacter!: (newCharacter: RawCharacterType) => void
    @characterModule.Action saveCharacterLocally!: (newCharacter: RawCharacterType) => void
    @characterModule.Action deleteCharacter!: (character: RawCharacterType) => Promise<any>
    @authenticationModule.Getter isLoggedIn!: boolean

    @classesModule.State classes!: ClassType[]
    @classesModule.Action fetchClasses!: () => void
    @archetypesModule.State archetypes!: ArchetypeType[]
    @archetypesModule.Action fetchArchetypes!: () => void
    @speciesModule.State species!: SpeciesType[]
    @speciesModule.Action fetchSpecies!: () => void
    @equipmentModule.State equipment!: EquipmentType[]
    @equipmentModule.Action fetchEquipment!: () => void
    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void
    @featsModule.State feats!: FeatType[]
    @featsModule.Action fetchFeats!: () => void
    @featuresModule.State features!: FeatureType[]
    @featuresModule.Action fetchFeatures!: () => void
    @backgroundsModule.State backgrounds!: BackgroundType[]
    @backgroundsModule.Action fetchBackgrounds!: () => void
    @characterAdvancementsModule.Action fetchCharacterAdvancements!: () => void
    @skillsModule.Action fetchSkills!: () => void
    @conditionsModule.Action fetchConditions!: () => void
    @enhancedItemsModule.Action fetchEnhancedItems!: () => void

    hasFetchedData = false
    isEditing = true
    isDirty = false
    currentStep = 0

    created () {
      Promise.all([
        this.fetchClasses(),
        this.fetchArchetypes(),
        this.fetchEquipment(),
        this.fetchPowers(),
        this.fetchFeats(),
        this.fetchFeatures(),
        this.fetchBackgrounds(),
        this.fetchSpecies(),
        this.fetchCharacterAdvancements(),
        this.fetchSkills(),
        this.fetchConditions(),
        this.fetchEnhancedItems()
      ]).then(() => {
        if (!this.character) {
          window.alert('Character not found')
          this.$router.push('/tools/mycharacters')
        }
        this.hasFetchedData = true
        this.isEditing = !this.characterValidation.isValid
        this.isDirty = !this.isLoggedIn || (this.isNew === 'true' && this.isEditing)
        this.currentStep = this.getIsEmptyCharacter(this.character) ? 0 : 1
      })
    }

    get character () {
      return this.getCharacterById(this.characterId)
    }

    get completeCharacter () {
      return this.character ? this.generateCompleteCharacter(this.character) : null
    }

    get characterValidation () {
      return this.getCharacterValidation(this.character)
    }

    get title () {
      return ((this.character && this.character.name) || 'Characters') + Vue.prototype.$titleSuffix
    }

    goToStep (step: number) {
      this.isEditing = true
      this.currentStep = step
      window.scrollTo(0, 0)
    }

    goToSheet () {
      this.isEditing = false
      if (this.isLoggedIn) this.handleSaveCharacter()
      else if (this.character) this.saveCharacterLocally(this.character)
      window.scrollTo(0, 0)
    }

    saveCharacterIfDone (newCharacter: RawCharacterType) {
      if (this.isEditing || !this.isLoggedIn) {
        this.isDirty = true
        this.saveCharacterLocally(newCharacter)
      } else {
        this.isDirty = false
        this.saveCharacter(newCharacter)
      }
    }

    updateCharacter (newCharacter: RawCharacterType) {
      this.saveCharacterIfDone(merge({}, this.character, newCharacter))
    }

    replaceCharacterProperty ({ path, property }: { path: string, property: any }) {
      let characterCopy = merge({}, this.character)
      set(characterCopy, path, property)
      this.saveCharacterIfDone(characterCopy)
    }

    replaceCharacterProperties (replacements: { path: string, property: any }[]) {
      let characterCopy = merge({}, this.character)
      replacements.forEach(({ path, property }) => set(characterCopy, path, property))
      this.saveCharacterIfDone(characterCopy)
    }

    deleteCharacterProperty ({ path, index }: { path: string, index: number | string }) {
      const oldProperty = get(this.character, path)
      let property = omit(oldProperty, index)
      if (Array.isArray(oldProperty)) property = Object.values(property)
      this.replaceCharacterProperty({ path, property })
    }

    handleSaveFeatureConfig (featureConfig: FeatureConfigType) {
      if (this.character && featureConfig) {
        var existingConfigIx = this.character.featureConfigs.findIndex(fc => fc.localId === featureConfig.localId)
        if (existingConfigIx > -1) {
          this.replaceCharacterProperty({
            path: `featureConfigs.${existingConfigIx}`,
            property: featureConfig
          })
        } else {
          featureConfig.localId = uniqueId()
          this.replaceCharacterProperty({
            path: `featureConfigs`,
            property: [
              ...[featureConfig],
              ...this.character && this.character.featureConfigs ? this.character.featureConfigs : []
            ]
          })
        }
        console.log('Event: saveFeatureConfig', featureConfig)
      }
    }

    handleSaveCharacter () {
      if (this.character) {
        this.isDirty = false
        this.saveCharacter(this.character)
      }
    }

    handleDeleteCharacter () {
      if (this.character) {
        this.deleteCharacter(this.character).then(() => this.$router.push('/tools/mycharacters'))
      }
    }
  }
</script>

<template lang="pug">
  div(v-if="hasFetchedData && character")
    vue-headful(v-bind="{ title }")
    BackButton(label="My Characters")
    CharacterBuilder(
      v-if="isEditing",
      v-bind="{ character, completeCharacter, characterValidation, currentStep, classes, archetypes, equipment, powers, feats, features, backgrounds, species, isDirty }",
      v-on="{ updateCharacter, deleteCharacterProperty, replaceCharacterProperty, replaceCharacterProperties, goToStep }",
      @saveFeatureConfig="handleSaveFeatureConfig",
      @deleteCharacter="handleDeleteCharacter",
      @saveCharacter="handleSaveCharacter",
      @viewSheet="goToSheet",
      @setClean="isDirty=false"
    )
    CharacterSheet(
      v-else-if="completeCharacter",
      v-bind="{ completeCharacter, characterValidation, isDirty }",
      :rawCharacter="character",
      v-on="{ updateCharacter, deleteCharacterProperty, replaceCharacterProperty, replaceCharacterProperties, goToStep }",
      @deleteCharacter="handleDeleteCharacter",
      @setClean="isDirty=false",
      @saveFeatureConfig="handleSaveFeatureConfig"
    )
  Loading(v-else)
</template>
