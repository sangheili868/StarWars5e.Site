<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import MyDialog from '@/components/MyDialog.vue'
  import { EquipmentType } from '@/types/lootTypes'
  import { chain, startCase } from 'lodash'
  import MySelect from '@/components/MySelect.vue'

  const equipmentModule = namespace('equipment')

  @Component({
    components: {
      MyDialog,
      MySelect
    }
  })
  export default class CharacterSheetEquipmentAdder extends Vue {
    @Prop(Number) readonly position!: number

    @equipmentModule.State equipment!: EquipmentType[]
    isOpen = false
    selected = ''
    quantity = 1
    equipped = false
    filter = ''
    startCase = startCase

    get filters () {
      return chain(this.equipment)
        .uniqBy('equipmentCategory')
        .map(({ equipmentCategory }) => ({
          text: startCase(equipmentCategory),
          value: equipmentCategory
        }))
        .sortBy('value')
        .value()
    }

    get filteredEquipment () {
      return this.equipment
        .filter(({ equipmentCategory }) => !this.filter || (equipmentCategory === this.filter))
        .map(({ name }) => name)
    }
    get selectedEquipment () {
      return this.equipment.find(({ name }) => name === this.selected)
    }

    get isEquippable () {
      return this.selectedEquipment && ['Weapon', 'Armor'].includes(this.selectedEquipment.equipmentCategory)
    }

    onFilterChange () {
      this.selected = ''
    }

    resetValues () {
      this.selected = ''
      this.quantity = 1
      this.equipped = false
    }

    addItem () {
      this.$emit('updateCharacter', { equipment: { [this.position]: {
        name: this.selected,
        quantity: this.quantity,
        ...(this.isEquippable ? { equipped: this.equipped } : {})
      } } })
      this.isOpen = false
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
      MySelect(v-model="filter", :items="filters", label="Filter by Category", @change="onFilterChange")
      v-autocomplete(v-model="selected", :items="filteredEquipment", label="Select equipment")
      div(v-if="selectedEquipment")
        div.d-flex.justify-space-between
          div
            div #[strong Cost:] {{ selectedEquipment.cost }}
            div #[strong Weight:] {{ selectedEquipment.weight}}
        v-row
          v-col.d-flex.align-center
            strong Quantity
            v-text-field(v-model="quantity", outlined, single-line, hide-details, type="number").mx-2
          v-col(v-if="isEquippable")
            v-checkbox(v-model="equipped", hide-details, color="primary", label="Equipped").ma-2
        br
        div {{ selectedEquipment.description }}
    template(#actions)
      v-btn(color="primary", :disabled="!selected", @click="addItem") Add
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
