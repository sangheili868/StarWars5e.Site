<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ClassType, PowerType, FeatType, BackgroundType } from '@/types/characterTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import CharacterSheetTop from './CharacterSheetTop.vue'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import rawCharacter from '@/test/senyaRaw.json'
  import generateCharacter from '../CharacterEngine/generateCharacter'
  import { range, isEmpty } from 'lodash'

  const classesModule = namespace('classes')
  const equipmentModule = namespace('equipment')
  const powersModule = namespace('powers')
  const featsModule = namespace('feats')
  const backgroundsModule = namespace('backgrounds')

  @Component({
    components: {
      CharacterSheetTop,
      CharacterSheetSection
    }
  })
  export default class CharacterSheet extends Vue {
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
    character: RawCharacterType | {} = rawCharacter

    created () {
      this.fetchClasses()
      this.fetchEquipment()
      this.fetchPowers()
      this.fetchFeats()
      this.fetchBackgrounds()
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

    get isValidCharacter () {
      return !isEmpty(this.character)
    }

    get completeCharacter () {
      return this.isValidCharacter && generateCharacter(
        this.character as RawCharacterType,
        this.classes,
        this.equipment,
        this.powers,
        this.feats,
        this.backgrounds
      )
    }
  }
</script>

<template lang="pug">
  div
    v-btn(color="primary").mb-2 Load New Character
    CharacterSheetTop(v-if="isValidCharacter", v-bind="{ completeCharacter }")
    v-row(v-if="isValidCharacter", justify-space-around).nx-2
      v-col(v-for="section in range(numSections)", :key="section", :md="4", :sm="6")
        CharacterSheetSection(v-bind="{ completeCharacter }", :currentTab="openTabs[section]")
</template>
