<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
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
    @Prop(Array) readonly customProficiencies!: string[]
    @Prop(Array) readonly languages!: string[]
    @Prop(Object) readonly characteristics!: CharacteristicsType
    @Prop(Array) readonly nonCombatFeatures!: CompletedFeatureType[]

    isOpen = false
    chosenCategory = ''
    newProficiency = ''
    allProficiencies = {
      'Weapons': [
        'Simple Vibroweapons',
        'Techblades',
        'Simple Blasters',
        'All Blasters',
        'All Vibroweapons',
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
        proficiency => ![...this.proficiencies, ...this.customProficiencies]
          .map(this.startCase)
          .includes(this.startCase(proficiency))
      )).omitBy(proficiencyList => proficiencyList.length <= 0).value()
    }

    get proficiencyCategories () {
      return Object.keys(this.customProficiencyList)
    }

    resetValues () {
      this.chosenCategory = ''
      this.newProficiency = ''
    }

    startCase (input: string) {
      // Lodash's start case removes apostrophes, so we need a custom function to handle things like Biochemist's Kit
      return input.replace(/\w+/g, capitalize).replace("'S", "'s")
    }

    handleDelete (index: number) {
      this.$emit('deleteCharacterProperty', { path: 'customProficiencies', index })
    }

    handleAdd () {
      this.$emit('updateCharacter', {
        customProficiencies: {
          [this.customProficiencies.length]: this.newProficiency
        }
      })
      this.isOpen = false
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
    h3.mt-2 Proficiencies
    div(v-for="proficiency in proficiencies", :key="proficiency").caption {{ startCase(proficiency) }}
    div(v-for="(proficiency, index) in customProficiencies", :key="index").d-flex.align-center.justify-space-between
      div.caption {{ startCase(proficiency) }}
      ConfirmDelete(label="Proficiency", :item="startCase(proficiency) + ' proficiency'", @delete="handleDelete(index)")
    MyDialog(v-if="proficiencyCategories.length", v-model="isOpen")
      template(v-slot:activator="{ on }")
        div.text-center.mt-2
          v-btn(v-on="on", @click="resetValues", color="primary") Add Proficiency
      template(#title) Add Proficiency
      template(#text)
        v-autocomplete(
          v-model="chosenCategory",
          :items="proficiencyCategories",
          label="Filter by Category",
          @change="newProficiency=''"
        )
        v-autocomplete(
          v-if="chosenCategory",
          v-model="newProficiency",
          :items="customProficiencyList[chosenCategory]",
          label="Choose a Proficiency"
        )
      template(#actions)
        v-btn(color="primary", :disabled="newProficiency === ''", @click="handleAdd") Add
        v-spacer
        v-btn(color="primary", text, @click="isOpen=false") Close
</template>
