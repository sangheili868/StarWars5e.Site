<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ClassType, ArchetypeType, PowerType, FeatType, BackgroundType, SpeciesType } from '@/types/characterTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import JSONReader from '@/components/JSONReader.vue'
  import JSONWriter from '@/components/JSONWriter.vue'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import { range, isEmpty, isEqual, merge, get, set, camelCase } from 'lodash'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import Loading from '@/components/Loading.vue'
  import baseCharacter from '@/modules/CharacterEngine/baseCharacter.json'

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
      JSONReader,
      JSONWriter,
      CharacterSheetTop,
      CharacterSheetSection,
      Loading
    }
  })
  export default class CharacterSheet extends Vue {
    @characterModule.State character!: RawCharacterType
    @characterModule.Getter characterValidation!: { code: number, isValid: boolean, message: string }
    @characterModule.Getter completeCharacter!: CompleteCharacterType
    @characterModule.Action setCharacter!: (newCharacter: RawCharacterType) => void
    @characterModule.Action updateCharacter!: (newCharacter: RawCharacterType) => void
    @characterModule.Action deleteCharacterProperty!: ({ path, index }: { path: string, index: number }) => void
    @characterModule.Action replaceCharacterProperty!: ({ path, property }: { path: string, property: any[] }) => void

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

    range = range
    openTabs: number[] = [0, 1, 2]
    filename = ''
    hasFetchedData = false

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
        this.fetchConditions()
      ]).then(() => {
        this.hasFetchedData = true
        if (this.character && this.character.name) this.filename = camelCase(this.character.name) + '.json'
      })
    }

    get numSections () {
      return ({
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3
      } as { [ breakpoint: string ] : number })[this.$vuetify.breakpoint.name]
    }

    get isNotCharacter () {
      return isEmpty(this.character) || this.isBaseCharacter
    }

    get isBaseCharacter () {
      return isEqual(this.character, baseCharacter)
    }

    get isInvalidCharacter () {
      return !this.characterValidation.isValid && this.characterValidation.code !== 1 && !this.isBaseCharacter
    }

    handleCharacterUpload (newCharacter: any, filename: string) {
      const isValid = newCharacter && [
        'name',
        'species',
        'classes',
        'baseAbilityScores',
        'background',
        'characteristics',
        'equipment',
        'currentStats'
      ].every((field: string) => field in newCharacter)
      this.setCharacter(isValid ? newCharacter : {})
      this.filename = isValid ? filename : ''
    }

    goToTab (newTab: number, section: number) {
      Vue.set(this.openTabs, section, newTab)
    }
  }
</script>

<template lang="pug">
  div(v-if="hasFetchedData")
    v-alert(:value="isInvalidCharacter", dismissible, type="error") Incomplete Character: {{ characterValidation.message }}
    div.d-flex.align-center.justify-center.flex-wrap
      v-btn(:to="{ path: 'characterBuilder', query: { new: 'true' } }", color="primary") Create New Character
      JSONReader(label="Load Character From File", @input="handleCharacterUpload").ma-2
      v-btn(:disabled="isNotCharacter", to="characterBuilder", color="primary") Edit Character Details
      JSONWriter(:jsonData="character", v-bind="{ filename }").ma-2 Save Character
    CharacterSheetTop(
      v-if="completeCharacter",
      v-bind="{ completeCharacter }",
      @updateCharacter="updateCharacter",
      @replaceCharacterProperty="replaceCharacterProperty"
    )
    v-row(v-if="completeCharacter", justify-space-around).nx-2
      v-col(v-for="section in range(numSections)", :key="section", :md="4", :sm="6")
        CharacterSheetSection(
          v-bind="{ completeCharacter }",
          :currentTab="openTabs[section]",
          @updateCharacter="updateCharacter",
          @deleteCharacterProperty="deleteCharacterProperty",
          @goToTab="newTab => goToTab(newTab, section)"
        )
  Loading(v-else)
</template>
