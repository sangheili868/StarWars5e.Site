<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ClassType, PowerType, FeatType, BackgroundType } from '@/types/characterTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import JSONReader from '@/components/JSONReader.vue'
  import JSONWriter from '@/components/JSONWriter.vue'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import generateCharacter from '@/modules/CharacterEngine/generateCharacter'
  import { range, isEmpty, merge, get, set } from 'lodash'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import Loading from '@/components/Loading.vue'

  const characterModule = namespace('character')
  const classesModule = namespace('classes')
  const equipmentModule = namespace('equipment')
  const powersModule = namespace('powers')
  const featsModule = namespace('feats')
  const backgroundsModule = namespace('backgrounds')

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
    @characterModule.Getter characterValidation!: { isValid: boolean, message: string }
    @characterModule.Getter completeCharacter!: CompleteCharacterType
    @characterModule.Action setCharacter!: (newCharacter: RawCharacterType) => void
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

    range = range
    openTabs: number[] = [0, 1, 2]
    filename = ''
    isAlertOpen = false
    hasFetchedData = false

    created () {
      Promise.all([
        this.fetchClasses(),
        this.fetchEquipment(),
        this.fetchPowers(),
        this.fetchFeats(),
        this.fetchBackgrounds()
      ]).then(() => { this.hasFetchedData = true })
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
      this.isAlertOpen = !isValid && newCharacter instanceof Object
    }

    goToTab (newTab: number, section: number) {
      Vue.set(this.openTabs, section, newTab)
    }

    deleteCharacterProperty (path: string, index: number) {
      const myList = get(this.character, path)
      const updatedList = myList.filter((item: any, itemIndex: number) => itemIndex !== index)
      set(this.character, path, updatedList)
    }

    replaceCharacterList (path: string, list: any[]) {
      set(this.character, path, list)
    }
  }
</script>

<template lang="pug">
  div(v-if="hasFetchedData")
    div {{ characterValidation.message }}
    div {{ character }}
    v-alert(v-model="isAlertOpen", dismissible, type="error") Invalid Character
    div.d-flex.align-center.justify-center.flex-wrap
      JSONReader(label="Load New Character", @input="handleCharacterUpload").ma-2
      JSONWriter(:jsonData="character", v-bind="{ filename }").ma-2 Save Character
    CharacterSheetTop(
      v-if="completeCharacter",
      v-bind="{ completeCharacter }",
      @updateCharacter="updateCharacter",
      @replaceCharacterList="replaceCharacterList"
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
