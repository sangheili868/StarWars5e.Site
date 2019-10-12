<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'

  @Component
  export default class CharacterSheetEquipmentPanel extends Vue {
    @Prop(Object) readonly item!: EquipmentType
    @Prop(Number) readonly index!: number

    get isEquippable () {
      return ['Weapon', 'Armor'].includes(this.item.equipmentCategory)
    }

    updateQuantity (newQuantity: number) {
      const fixedQuantity = Math.max(0, newQuantity)
      this.$emit('updateCharacter', { equipment: { [this.index]: { quantity: fixedQuantity } } })
    }
  }
</script>

<template lang="pug">
  v-expansion-panel.equipmentPanel
    v-expansion-panel-header.pa-2 {{ item.name }} {{ item.quantity > 1 ? `(${item.quantity})` : '' }}
    v-expansion-panel-content.ma-2.caption
      div #[strong Cost:] {{ item.cost }}
      div #[strong Weight:] {{ item.weight}}
      div.d-flex.align-center
        strong Quantity
        v-text-field(
          :class="$style.quantityInput",
          outlined,
          single-line,
          hide-details,
          type="number",
          :value="item.quantity",
          @input="updateQuantity"
        ).mx-2
      div(v-if="isEquippable").d-flex.align-center
        strong Equipped
        v-checkbox(
          :input-value="item.equipped",
          hide-details,
          color="primary",
          :class="$style.checkbox",
          @change="isChecked => $emit('updateCharacter', { equipment: { [index]: { equipped: isChecked } } })"
        ).ma-2
      br
      div {{ item.description }}
      v-btn Remove
</template>

<style lang="scss">
  .equipmentPanel .v-expansion-panel-header {
    min-height: 0;
  }
</style>

<style lang="scss" module>
  .checkbox {
    flex: none !important;
    margin-top: 0 !important;
  }

  .quantityInput {
    max-width: 100px;
  }
</style>
