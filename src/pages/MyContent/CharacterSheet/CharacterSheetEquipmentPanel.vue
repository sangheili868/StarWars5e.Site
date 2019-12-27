<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'
  import { startCase } from 'lodash'
  import LootWeaponsProperties from '@/pages/Loot/LootWeaponsProperties.vue'
  import VueMarkdown from 'vue-markdown'

  @Component({
    components: {
      LootWeaponsProperties,
      VueMarkdown
    }
  })
  export default class CharacterSheetEquipmentPanel extends Vue {
    @Prop(Object) readonly item!: EquipmentType
    @Prop(Number) readonly index!: number

    get isEquippable () {
      return ['Weapon', 'Armor'].includes(this.item.equipmentCategory)
    }

    startCase = startCase

    updateQuantity (newQuantity: number) {
      const fixedQuantity = Math.max(0, newQuantity)
      this.$emit('updateCharacter', { equipment: { [this.index]: { quantity: fixedQuantity } } })
    }

    getWeaponDamage (weapon: EquipmentType) {
      return weapon.damageNumberOfDice ? `${weapon.damageNumberOfDice}d${weapon.damageDieType} ${weapon.damageType}` : 'Special'
    }
  }
</script>

<template lang="pug">
  v-expansion-panel.equipmentPanel
    v-expansion-panel-header.pa-2 {{ item.name }} {{ item.quantity > 1 ? `(${item.quantity})` : '' }}
    v-expansion-panel-content.ma-2.caption
      div.d-flex.justify-space-between
        div
          div #[strong Cost:] {{ item.cost }}
          div #[strong Weight:] {{ item.weight}}
        v-btn(icon, @click="$emit('deleteCharacterProperty', { path: 'equipment', index })")
          v-icon fa-trash
      v-row
        v-col.d-flex.align-center
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
        v-col(v-if="isEquippable").d-flex.align-center.justify-center
          strong Equipped
          v-checkbox(
            :input-value="item.equipped",
            hide-details,
            color="primary",
            :class="$style.checkbox",
            @change="isChecked => $emit('updateCharacter', { equipment: { [index]: { equipped: isChecked } } })"
          ).ma-2
      div(v-if="item.equipmentCategory.toLowerCase() === 'armor'")
        div(v-if="item.armorClassification !== 'Shield'") #[strong {{ item.armorClassification }} Armor]
        div #[strong AC:] {{ item.ac }}
        div(v-if="item.stealthDisadvantage") #[strong Imposes Stealth Disadvantage]
        div(v-if="item.strengthRequirement.includes('Str')") #[strong Requires {{ item.strengthRequirement }}]
      div(v-else-if="item.equipmentCategory.toLowerCase() === 'weapon'")
        div #[strong {{ startCase(item.weaponClassification) }}]
        div #[strong Damage:] {{ getWeaponDamage(item) }}
        div
          strong Properties:
          LootWeaponsProperties(:propertyList="item.properties")
      VueMarkdown(v-if="item.description", :source="item.description")
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
    max-width: 100px !important;
  }
</style>
