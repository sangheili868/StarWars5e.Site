<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharactersViewSheet from './CharactersViewSheet.vue'
  import CharacterBuilder from './CharacterBuilder/CharacterBuilder.vue'
  import CharacterSheet from './CharacterSheet/CharacterSheet.vue'
  import JSONReader from '@/components/JSONReader.vue'
  import JSONWriter from '@/components/JSONWriter.vue'
  import Loading from '@/components/Loading.vue'
  import { namespace } from 'vuex-class'
  import { ClassType, ArchetypeType, PowerType, FeatType, BackgroundType, SpeciesType } from '@/types/characterTypes'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import { RawCharacterType, RawCharacteristicsType } from '@/types/rawCharacterTypes'
  import { CharacterValidationType } from '@/types/utilityTypes'
  import { range, isEmpty, isEqual, merge, get, set, camelCase } from 'lodash'
  import baseCharacter from '@/modules/CharacterEngine/baseCharacter.json'
  import builderVersion from '@/version'
  import semver from 'semver'
  import BackButton from '@/components/BackButton.vue'

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
  const enhancedItemsModule = namespace('enhancedItems')

  @Component({
    components: {
      CharactersViewSheet,
      CharacterBuilder,
      CharacterSheet,
      JSONReader,
      JSONWriter,
      BackButton,
      Loading
    }
  })
  export default class Characters extends Vue {
    @Prop(String) readonly characterId!: string
    @characterModule.State characters!: RawCharacterType[]
    @characterModule.State isDirty!: boolean
    @characterModule.Getter generateCompleteCharacter!: (rawCharacter: RawCharacterType) => CompleteCharacterType
    @characterModule.Getter getCharacterById!: (characterId: string) => RawCharacterType | undefined
    @characterModule.Getter getIsEmptyCharacter!: (character: RawCharacterType | undefined) => boolean
    @characterModule.Getter getCharacterValidation!: (character: RawCharacterType | undefined) => CharacterValidationType
    @characterModule.Action setClean!: () => void
    @characterModule.Action createCharacter!: () => void
    @characterModule.Action loadCharacter!: (characterId: string) => void
    @characterModule.Action setCharacter!: (newCharacter: RawCharacterType) => Promise<any>
    @characterModule.Action updateCharacter!: (newCharacter: RawCharacterType) => void
    @characterModule.Action deleteCharacterProperty!: (payload: { path: string, index: number }) => void
    @characterModule.Action replaceCharacterProperty!: (payload: { path: string, property: any[] }) => void
    @characterModule.Action replaceCharacterProperties!: (replacements: { path: string, property: any }[]) => void

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
    @backgroundsModule.State backgrounds!: BackgroundType[]
    @backgroundsModule.Action fetchBackgrounds!: () => void
    @characterAdvancementsModule.Action fetchCharacterAdvancements!: () => void
    @skillsModule.Action fetchSkills!: () => void
    @conditionsModule.Action fetchConditions!: () => void
    @enhancedItemsModule.Action fetchEnhancedItems!: () => void

    hasFetchedData = false
    isEditing = true
    currentStep = 0
    character: RawCharacterType | undefined = undefined

    created () {
      Promise.all([
        this.fetchClasses(),
        this.fetchArchetypes(),
        this.fetchEquipment(),
        this.fetchPowers(),
        this.fetchFeats(),
        this.fetchBackgrounds(),
        this.fetchSpecies(),
        this.fetchCharacterAdvancements(),
        this.fetchSkills(),
        this.fetchConditions(),
        this.fetchEnhancedItems()
      ]).then(() => {
        this.character = this.getCharacterById(this.characterId)
        this.hasFetchedData = true
        this.isEditing = !this.characterValidation.isValid
        this.currentStep = this.isEmptyCharacter ? 0 : 1
      })
    }

    get completeCharacter () {
      return this.character ? this.generateCompleteCharacter(this.character) : null
    }

    get filename () {
      return (this.character && this.character.name) ? camelCase(this.character.name) : 'incompleteCharacter'
    }

    get isEmptyCharacter () {
      return this.getIsEmptyCharacter(this.character)
    }

    get title () {
      return ((this.character && this.character.name) || 'Characters') + Vue.prototype.$titleSuffix
    }

    get characterValidation () {
      return this.getCharacterValidation(this.character)
    }

    goToStep (step: number) {
      this.isEditing = true
      this.currentStep = step
      window.scrollTo(0, 0)
    }

    handleCreateNew () {
      this.goToStep(0)
      this.createCharacter()
    }

    checkBuilderVersion () {
      if (this.characterValidation.isValid && this.completeCharacter) {
        const isValidBuilderVersion = semver.valid(this.completeCharacter.builderVersion)
        const isCurrentBuilderVersion = isValidBuilderVersion && !semver.gt(builderVersion, this.completeCharacter.builderVersion)
        if (!isCurrentBuilderVersion) {
          console.info(`Upgrading character from builderVersion ${this.completeCharacter.builderVersion} to builderVersion ${builderVersion}`)
          this.updateCharacter({ builderVersion } as RawCharacterType)
        }
      }
    }

    handleCharacterUpload (newCharacter: any, newFilename: string) {
      this.setCharacter(newCharacter).then(this.checkBuilderVersion)
      this.isEditing = !this.getCharacterValidation(newCharacter).isValid
      this.currentStep = this.isEmptyCharacter ? 0 : 1
    }
  }
</script>

<template lang="pug">
  div(v-if="hasFetchedData")
    vue-headful(:title="title")
    v-banner(
      :value="isDirty",
      sticky,
      color="white",
      icon-color="red",
      :icon="$vuetify.breakpoint.name === 'xs' ? '' : 'fa-exclamation'",
      mobile-break-point="600",
      :class="$style.banner"
    ).white--text.mb-3
      div.d-flex.align-center.justify-space-around
        div Character has unsaved changes!
        JSONWriter(:jsonData="character", v-bind="{ filename }", @save="setClean").ml-1 Save
    BackButton(label="My Characters")
    template(v-if="isEditing")
      //- div.d-flex.align-center.justify-center.flex-wrap
        //- CharactersViewSheet(v-if="isEditing", v-bind="{ characterValidation }", @click="isEditing=false")
        //- v-btn(v-else, :disabled="isEmptyCharacter", color="primary", @click="goToStep(1)").ma-2 Edit Character
        //- JSONWriter(:jsonData="character", :disabled="isEmptyCharacter", v-bind="{ filename }", @save="setClean") Save Character
      CharacterBuilder(
        v-bind="{ character, characterValidation, currentStep, classes, archetypes, equipment, powers, feats, backgrounds, species }",
        v-on="{ updateCharacter, deleteCharacterProperty, replaceCharacterProperty, replaceCharacterProperties, goToStep }"
        @viewSheet="isEditing=false"
      )
    CharacterSheet(
      v-else,
      v-bind="{ completeCharacter }",
      :rawCharacter="character",
      v-on="{ updateCharacter, deleteCharacterProperty, replaceCharacterProperty, goToStep, handleCreateNew, handleCharacterUpload, setClean }"
    )
  Loading(v-else)
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .banner {
    z-index: 4 !important;
    background-color: $alert !important;
    border-radius: 10px !important;
  }
</style>

<style lang="scss">
  .v-banner.v-banner--is-mobile .v-banner__wrapper {
    padding: 5px;
  }

  .v-banner__text {
    flex-grow: 1;
  }
</style>
