<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CustomProficiencyType } from '@/types/rawCharacterTypes'
  import { CharacteristicsType, CompletedFeatureType } from '@/types/completeCharacterTypes'
  import { capitalize, chain } from 'lodash'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import MyDialog from '@/components/MyDialog.vue'

  @Component({
    components: {
      CharacterSheetExpansionFeatures,
      ConfirmDelete,
      MyDialog
    }
  })
  export default class CharacterSheetProficiencies extends Vue {
    @Prop(String) readonly alignment!: string
    @Prop(String) readonly background!: string
    @Prop(Array) readonly proficiencies!: string[]
    @Prop(Array) readonly skillAndSaveProficiencies!: string[]
    @Prop(Object) readonly customProficiencies!: CustomProficiencyType
    @Prop(Array) readonly customLanguages!: string[]
    @Prop(Array) readonly languages!: string[]
    @Prop(Object) readonly characteristics!: CharacteristicsType
    @Prop(Array) readonly nonCombatFeatures!: CompletedFeatureType[]

    isProficienciesOpen = false
    isLanguagesOpen = false
    isExpertise = false
    chosenCategory = ''
    newProficiency = ''
    newLanguage = ''
    allProficiencies = {
      'Weapons': [
        'Simple Vibroweapons',
        'All Vibroweapons',
        'Techblades',
        'Simple Blasters',
        'All Blasters',
        'Simple Lightweapons',
        'All Lightweapons',
        'Lightsaber',
        'Blaster Pistol',
        'Vibrorapier',
        'Hidden Blade',
        'Chakram',
        'Doubleblade',
        'Light Ring',
        'Saberwhip',
        'Vibrowhip'
      ],
      'Armor': [
        'Light Armor',
        'Medium Armor',
        'Heavy Armor'
      ],
      'Tools': [
        'Mason\'s Tools',
        'Biochemist\'s Kit',
        'Carpenter\'s Kit',
        'Demolitions kit',
        'Disguise Kit',
        'Forgery Kit',
        'Poisoner’s Kit',
        'Security Kit',
        'Slicer’s Kit'

      ],
      'Saving Throws': [
        'Dexterity Saving Throws',
        'Wisdom Saving Throws',
        'Constitution Saving Throws',
        'Strength Saving Throws',
        'Charisma Saving Throws',
        'Intelligence Saving Throws'
      ],
      'Skills': [
        'Acrobatics',
        'Sleight of Hand',
        'Stealth',
        'Animal Handling',
        'Insight',
        'Medicine',
        'Perception',
        'Survival',
        'Athletics',
        'Deception',
        'Intimidation',
        'Performance',
        'Persuasion',
        'Investigation',
        'Lore',
        'Nature',
        'Piloting',
        'Technology'
      ]
    }

    get customProficiencyList () {
      return chain(this.allProficiencies).mapValues(proficiencyList => proficiencyList.filter(
        proficiency => ![...this.proficiencies, ...(Object.keys(this.customProficiencies)), ...this.skillAndSaveProficiencies]
          .map(this.startCase)
          .includes(this.startCase(proficiency))
      )).omitBy(proficiencyList => proficiencyList.length <= 0).value()
    }

    get proficiencyCategories () {
      return Object.keys(this.customProficiencyList)
    }

    get filteredList () {
      return this.chosenCategory ? this.customProficiencyList[this.chosenCategory] : Object.values(this.customProficiencyList).flat()
    }

    get isSkill () {
      return this.allProficiencies.Skills.includes(this.newProficiency)
    }

    resetValues () {
      this.chosenCategory = ''
      this.newProficiency = ''
      this.isExpertise = false
    }

    startCase (input: string) {
      // Lodash's start case removes apostrophes, so we need a custom function to handle things like Biochemist's Kit
      return input.replace(/\w+/g, capitalize).replace("'S", "'s")
    }

    handleDelete (path: string, index: number) {
      this.$emit('deleteCharacterProperty', { path, index })
    }

    handleAddProficiency () {
      this.$emit('updateCharacter', {
        customProficiencies: {
          [this.newProficiency]: this.isExpertise ? 'expertise' : 'proficient'
        }
      })
      this.isProficienciesOpen = false
    }

    handleAddLanguage () {
      this.$emit('updateCharacter', {
        customLanguages: {
          [this.customLanguages.length]: this.newLanguage
        }
      })
      this.isLanguagesOpen = false
    }
  }
</script>

<template lang="pug">
  div
    h3 Background Feature
    CharacterSheetExpansionFeatures(
      :features="nonCombatFeatures",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
    )
    h3.mt-2 Langauges
    div(v-for="language in languages", :key="language").caption {{ language }}
    div(v-for="(language, index) in customLanguages", :key="'language' + index").d-flex.align-center.justify-space-between
      div.caption {{ language }}
      ConfirmDelete(label="Language", :item="language", @delete="handleDelete('customLanguages', index)")
    MyDialog(v-model="isLanguagesOpen")
      template(v-slot:activator="{ on }")
        div.text-center.mt-2
          v-btn(v-on="on", @click="newLanguage = ''", color="primary") Add Language
      template(#title) Add Language
      template(#text)
        v-text-field(v-model="newLanguage")
      template(#actions)
        v-btn(color="primary", :disabled="newLanguage === ''", @click="handleAddLanguage") Add
        v-spacer
        v-btn(color="primary", text, @click="isLanguagesOpen=false") Close
    h3.mt-2 Proficiencies
    div(v-for="proficiency in proficiencies", :key="proficiency").caption {{ startCase(proficiency) }}
    div(v-for="(proficiencyLevel, proficiency, index) in customProficiencies", :key="'prof' + index").d-flex.align-center.justify-space-between
      div.caption {{ startCase(proficiency) + (proficiencyLevel === 'expertise' ? ' (Expertise)' : '') }}
      ConfirmDelete(
        label="Proficiency",
        :item="startCase(proficiency) + (proficiencyLevel === 'expertise' ? ' expertise' : ' proficiency')",
        @delete="handleDelete('customProficiencies', proficiency)"
      )
    MyDialog(v-if="proficiencyCategories.length", v-model="isProficienciesOpen")
      template(v-slot:activator="{ on }")
        div.text-center.mt-2
          v-btn(v-on="on", @click="resetValues", color="primary") Add Proficiency
      template(#title) Add Proficiency
      template(#text)
        v-autocomplete(
          v-model="chosenCategory",
          :items="proficiencyCategories",
          label="Filter by Category",
          @change="newProficiency=''; isExpertise = false"
        )
        v-autocomplete(v-model="newProficiency", :items="filteredList", label="Select Proficiency", @change="isExpertise = false")
        v-checkbox(v-if="isSkill", v-model="isExpertise", color="primary", label="Expertise")
      template(#actions)
        v-btn(color="primary", :disabled="newProficiency === ''", @click="handleAddProficiency") Add
        v-spacer
        v-btn(color="primary", text, @click="isProficienciesOpen=false") Close
</template>
