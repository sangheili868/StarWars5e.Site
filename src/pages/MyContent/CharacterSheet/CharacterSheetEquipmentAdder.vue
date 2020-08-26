<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import MyDialog from '@/components/MyDialog.vue'
  import { EquipmentType, EnhancedItemType, isWeaponType, isArmorType, isEnhancedItem, LootType } from '@/types/lootTypes'
  import { chain, startCase, intersection } from 'lodash'
  import MySelect from '@/components/MySelect.vue'
  import VueMarkdown from 'vue-markdown'
  import { AttunementType } from '@/types/completeCharacterTypes'

  const equipmentModule = namespace('equipment')
  const enhancedItemsModule = namespace('enhancedItems')

  interface items {
    text: string
    value: string
  }

  @Component({
    components: {
      MyDialog,
      MySelect,
      VueMarkdown
    }
  })
  export default class CharacterSheetEquipmentAdder extends Vue {
    @Prop(Number) readonly position!: number
    @Prop(Object) readonly attunement!: AttunementType

    @equipmentModule.State equipment!: EquipmentType[]
    @enhancedItemsModule.State enhancedItems!: EnhancedItemType[]

    isOpen = false
    selected = ''
    quantity = 1
    equipped = false
    attuned = false
    category = 'All Equipment'
    categories = ['All Equipment', 'Armor', 'Weapon', 'Adventuring Gear', 'Enhanced Items']
    type = 'All Types'
    startCase = startCase

    typeField (equipment: EquipmentType): string {
      if (isEnhancedItem(equipment)) return 'type'
      else if (isWeaponType(equipment)) return 'weaponClassification'
      else if (isArmorType(equipment)) return 'armorClassification'
      else return 'equipmentCategory'
    }

    typeText (equipment: EquipmentType | EnhancedItemType): string {
      if (isEnhancedItem(equipment)) return equipment.type
      else if (isWeaponType(equipment)) return equipment.weaponClassification
      else if (isArmorType(equipment)) return equipment.armorClassification
      else return equipment.equipmentCategory
    }

    get allItems (): (EquipmentType | EnhancedItemType)[] {
      return [ ...this.enhancedItems, ...this.equipment ]
    }

    get types (): items[] {
      return [
        { text: 'All Types', value: 'All Types' },
        ...chain(this.allItems)
            .filter(this.isRightCategory)
            .uniqBy(this.typeText)
            .map(equipment => ({
              text: startCase(this.typeText(equipment)),
              value: this.typeText(equipment)
            }))
            .sortBy('value')
            .value()
      ]
    }

    get filteredEquipment (): string[] {
      return this.allItems.filter(equipment => this.isRightCategory(equipment) && (
        !this.type ||
        this.type === 'All Types' ||
        this.type === this.typeText(equipment)
      )).map(({ name }) => name)
    }

    get selectedEquipment (): LootType | undefined {
      return this.allItems.find(({ name }) => name === this.selected)
    }

    get isEquippable () {
      if (!this.selectedEquipment || isEnhancedItem(this.selectedEquipment)) return false
      // else if (isEnhancedItem(this.selectedEquipment)) {
        // return this.selectedEquipment && ['Weapon', 'Armor', 'Shield', 'Focus'].includes(this.selectedEquipment.type)
      else {
        return this.selectedEquipment && ['Weapon', 'Armor'].includes(this.selectedEquipment.equipmentCategory)
      }
    }

    get isAttuneable () {
      return this.selectedEquipment && isEnhancedItem(this.selectedEquipment) && this.selectedEquipment.requiresAttunement
    }

    get atAttunementLimit () {
      return this.selectedEquipment &&
        isEnhancedItem(this.selectedEquipment) &&
        this.attunement.current + (intersection(this.selectedEquipment.rarityOptions, ['Legendary', 'Artifact']).length > 0 ? 2 : 1) > this.attunement.maximum
    }

    isEnhancedItem = isEnhancedItem

    isRightCategory (equipment: EquipmentType | EnhancedItemType) {
      return !this.category ||
        this.category === 'All Equipment' ||
        (isEnhancedItem(equipment) && this.category === 'Enhanced Items') ||
        (!isEnhancedItem(equipment) && (
          this.category === equipment.equipmentCategory || (
            this.category === 'Adventuring Gear' &&
            !['Weapon', 'Armor'].includes(equipment.equipmentCategory)
          )
        ))
    }

    onCategoryChange () {
      this.type = ''
      this.onTypeChange()
    }

    onTypeChange () {
      this.selected = ''
    }

    onSelectionChange () {
      this.attuned = false
    }

    resetValues () {
      this.selected = ''
      this.quantity = 1
      this.equipped = false
      this.attuned = false
      this.category = 'All Equipment'
      this.type = 'All Types'
    }

    addItem () {
      if (this.selectedEquipment) {
        this.$emit('updateCharacter', { equipment: { [this.position]: {
          name: this.selected,
          quantity: this.quantity,
          category: isEnhancedItem(this.selectedEquipment) ? 'EnhancedItem' : 'Equipment',
          ...(this.isEquippable ? { equipped: this.equipped } : {}),
          ...(this.isAttuneable ? { attuned: this.attuned } : {})
        } } })
        this.isOpen = false
      }
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on", icon, @click="resetValues", color="primary")
        v-icon fa-plus
    template(#title) Add Equipment
    template(#text)
      MySelect(v-model="category", :items="categories", label="Filter by Category", @change="onCategoryChange")
      MySelect(v-model="type", :items="types", label="Filter by Type", @change="onTypeChange")
      v-autocomplete(v-model="selected", :items="filteredEquipment", label="Search", @change="onSelectionChange")
      div(v-if="selectedEquipment")
        div.d-flex.justify-space-between
          div(v-if="isEnhancedItem(selectedEquipment)")
            div #[strong Type:] {{ startCase(selectedEquipment.type) }}
            div #[strong Rarity:] {{ startCase(selectedEquipment.rarityText) }}
            div(v-if="selectedEquipment.prerequisite") #[strong Prerequisite:] {{ selectedEquipment.prerequisite }}
          div(v-else)
            div #[strong Cost:] {{ selectedEquipment.cost }}
            div #[strong Weight:] {{ selectedEquipment.weight}}
        v-row
          v-col.d-flex.align-center
            strong Quantity
            v-text-field(v-model="quantity", outlined, single-line, hide-details, type="number").mx-2
          v-col(v-if="isEquippable")
            v-checkbox(v-model="equipped", hide-details, color="primary", label="Equipped").ma-2
          v-col(v-if="isAttuneable")
            v-checkbox(
              v-model="attuned",
              hide-details,
              :disabled="atAttunementLimit",
              :indeterminate="atAttunementLimit",
              color="primary",
              label="Attune"
            ).ma-2
        br
        VueMarkdown(:source="selectedEquipment.description || selectedEquipment.text")
    template(#actions)
      v-btn(color="primary", :disabled="!selected", @click="addItem") Add
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
