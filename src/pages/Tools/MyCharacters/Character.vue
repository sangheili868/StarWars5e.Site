<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterBuilder from './CharacterBuilder/CharacterBuilder.vue'
  import CharacterSheet from './CharacterSheet/CharacterSheet.vue'
  import Loading from '@/components/Loading.vue'
  import { namespace } from 'vuex-class'
  import { merge, get, set, camelCase, omit } from 'lodash'
  import baseCharacter from '@/modules/CharacterEngine/baseCharacter.json'
  import builderVersion from '@/version'
  import BackButton from '@/components/BackButton.vue'

  import { ClassType, ArchetypeType, PowerType, FeatType, BackgroundType, SpeciesType } from '@/types/characterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
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
  const enhancedItemsModule = namespace('enhancedItems')

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
    @characterModule.State characters!: RawCharacterType[]
    @characterModule.Getter generateCompleteCharacter!: (rawCharacter: RawCharacterType) => CompleteCharacterType | null
    @characterModule.Getter getCharacterById!: (characterId: string) => RawCharacterType | undefined
    @characterModule.Getter getIsEmptyCharacter!: (character: RawCharacterType | undefined) => boolean
    @characterModule.Getter getCharacterValidation!: (character: RawCharacterType | undefined) => CharacterValidationType
    @characterModule.Action saveCharacter!: (newCharacter: RawCharacterType) => void

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
    isDirty = false
    currentStep = 0

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
        if (!this.character) window.alert('Character not found: ' + this.characterId)
        this.hasFetchedData = true
        this.isEditing = !this.characterValidation.isValid
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

    updateCharacter (newCharacter: RawCharacterType) {
      this.saveCharacter(merge({}, this.character, newCharacter))
    }

    replaceCharacterProperty ({ path, property }: { path: string, property: any }) {
      let characterCopy = merge({}, this.character)
      set(characterCopy, path, property)
      this.saveCharacter(characterCopy)
    }

    replaceCharacterProperties (replacements: { path: string, property: any }[]) {
      let characterCopy = merge({}, this.character)
      replacements.forEach(({ path, property }) => set(characterCopy, path, property))
      this.saveCharacter(characterCopy)
    }

    deleteCharacterProperty ({ path, index }: { path: string, index: number | string }) {
      const oldProperty = get(this.character, path)
      let property = omit(oldProperty, index)
      if (Array.isArray(oldProperty)) property = Object.values(property)
      this.replaceCharacterProperty({ path, property })
    }
  }
</script>

<template lang="pug">
  div(v-if="hasFetchedData")
    vue-headful(v-bind="{ title }")
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
    BackButton(label="My Characters")
    CharacterBuilder(
      v-if="isEditing",
      v-bind="{ character, characterValidation, currentStep, classes, archetypes, equipment, powers, feats, backgrounds, species }",
      v-on="{ updateCharacter, deleteCharacterProperty, replaceCharacterProperty, replaceCharacterProperties, goToStep }"
      @viewSheet="isEditing=false"
    )
    CharacterSheet(
      v-else-if="completeCharacter",
      v-bind="{ completeCharacter }",
      :rawCharacter="character",
      v-on="{ updateCharacter, deleteCharacterProperty, replaceCharacterProperty, goToStep }"
      @setClean="isDirty=false"
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
