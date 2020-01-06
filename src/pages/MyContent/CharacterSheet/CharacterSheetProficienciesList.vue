<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import MyDialog from '@/components/MyDialog.vue'
  import { SkillType } from '@/types/lookupTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import { CustomProficiencyType } from '@/types/rawCharacterTypes'
  import { capitalize, chain, startCase } from 'lodash'
  import MySelect from '@/components/MySelect.vue'

  const skillsModule = namespace('skills')
  const equipmentModule = namespace('equipment')

  @Component({
    components: {
      ConfirmDelete,
      MyDialog,
      MySelect
    }
  })
  export default class CharacterSheetProficienciesList extends Vue {
    @Prop(Array) readonly proficiencies!: string[]
    @Prop(Array) readonly skillAndSaveProficiencies!: string[]
    @Prop(Array) readonly customProficiencies!: CustomProficiencyType[]

    @skillsModule.State skills!: SkillType[]
    @skillsModule.Action fetchSkills!: () => void
    @equipmentModule.State equipment!: EquipmentType[]
    @equipmentModule.Action fetchEquipment!: () => void

    isOpen = false
    isExpertise = false
    chosenCategory = ''
    newProficiency = ''
    toolCategories = ['Tool', 'MusicalInstrument', 'Kit', 'GamingSet']

    created () {
      this.fetchSkills()
      this.fetchEquipment()
    }

    get allProficiencies (): { [category: string]: string[] } {
      return {
        Weapons: [
          'Simple Vibroweapons',
          'All Vibroweapons',
          'Simple Lightweapons',
          'All Lightweapons',
          'Simple Blasters',
          'All Blasters',
          ...this.equipment.filter(({ equipmentCategory }) => equipmentCategory === 'Weapon').map(({ name }) => name)
        ],
        ...chain(this.equipment)
          .filter(({ equipmentCategory }) => this.toolCategories.includes(equipmentCategory))
          .groupBy('equipmentCategory')
          .mapValues(items => items.map(({ name }) => name))
          .mapKeys((list, key) => startCase(key))
          .value(),
        Armor: ['Light Armor', 'Medium Armor', 'Heavy Armor']
      }
    }

    get customProficiencyList () {
      return chain(this.allProficiencies).mapValues(proficiencyList => proficiencyList.filter(
        proficiency => ![...this.proficiencies, ...this.customProficiencies.map(({ name }) => name), ...this.skillAndSaveProficiencies]
          .map(this.startCase)
          .includes(this.startCase(proficiency))
      )).omitBy((proficiencyList, category) => proficiencyList.length <= 0).value()
    }

    get proficiencyCategories () {
      return Object.keys(this.customProficiencyList)
    }

    get filteredList () {
      return this.chosenCategory ? this.customProficiencyList[this.chosenCategory] : Object.values(this.customProficiencyList).flat()
    }

    get isTool () {
      return this.toolCategories.some(category => this.allProficiencies[startCase(category)].includes(this.newProficiency))
    }

    resetValues () {
      this.chosenCategory = ''
      this.newProficiency = ''
      this.isExpertise = false
    }

    handleAddProficiency () {
      this.$emit('updateCharacter', {
        customProficiencies: {
          [this.customProficiencies.length]: {
            name: this.newProficiency,
            proficiencyLevel: this.isExpertise ? 'expertise' : 'proficient'
          }
        }
      })
      this.isOpen = false
    }

    startCase (input: string) {
      // Lodash's start case removes apostrophes, so we need a custom function to handle things like Biochemist's Kit
      return input.replace(/\w+/g, capitalize).replace("'S", "'s")
    }

    handleDelete (index: number) {
      this.$emit('deleteCharacterProperty', { path: 'customProficiencies', index })
    }
  }
</script>

<template lang="pug">
  div
    h3.mt-2.d-flex.justify-space-between.align-end Proficiencies
      MyDialog(v-if="proficiencyCategories.length", v-model="isOpen")
        template(v-slot:activator="{ on }")
          v-btn(v-on="on", icon, @click="resetValues", color="primary")
            v-icon fa-plus
        template(#title) Add Proficiency
        template(#text)
          MySelect(
            v-model="chosenCategory",
            :items="proficiencyCategories",
            label="Filter by Category",
            clearable,
            @change="newProficiency=''; isExpertise = false"
          )
          v-combobox(
            :search-input.sync="newProficiency",
            :items="filteredList",
            label="Enter a Proficiency",
            autocomplete="off",
            @change="isExpertise = false"
          )
            template(v-slot:no-data)
              v-list-item
                v-list-item-content
                  v-list-item-title No proficiencies matching "#[strong {{ newProficiency }} ]". Press #[kbd tab] to create a custom one
          v-checkbox(v-if="isTool", v-model="isExpertise", color="primary", label="Expertise")
        template(#actions)
          v-btn(color="primary", :disabled="!newProficiency", @click="handleAddProficiency") Add {{ newProficiency }}
          v-spacer
          v-btn(color="primary", text, @click="isOpen=false") Close
    div(v-for="proficiency in proficiencies", :key="proficiency").caption {{ startCase(proficiency) }}
    div(v-for="({ name, proficiencyLevel }, index) in customProficiencies", :key="'prof' + index").d-flex.align-center.justify-space-between
      div.caption {{ startCase(name) + (proficiencyLevel === 'expertise' ? ' (Expertise)' : '') }}
      ConfirmDelete(
        label="Proficiency",
        :item="startCase(name) + '' + (proficiencyLevel === 'expertise' ? ' expertise' : ' proficiency')",
        @delete="handleDelete(index)"
      )
</template>
