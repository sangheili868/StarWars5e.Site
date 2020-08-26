<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'
  import { startCase, intersection } from 'lodash'
  import LootWeaponsProperties from '@/pages/Loot/LootWeaponsProperties.vue'
  import VueMarkdown from 'vue-markdown'
  import { CustomEquipmentType } from '@/types/rawCharacterTypes'
  import { CharacterWeaponType, CharacterLootType, isCharacterWeaponType, isCharacterArmorType, isCharacterEnhancedItem, AttunementType } from '@/types/completeCharacterTypes'

  @Component({
    components: {
      LootWeaponsProperties,
      VueMarkdown
    }
  })
  export default class CharacterSheetEquipmentPanel extends Vue {
    @Prop(Object) readonly item!: CharacterLootType | CustomEquipmentType
    @Prop(Number) readonly index!: number
    @Prop(Object) readonly attunement!: AttunementType
    @Prop(Boolean) readonly isCustomEquipment!: boolean

    get isEquippable () {
      return this.isNotCustom(this.item) && (isCharacterWeaponType(this.item) || isCharacterArmorType(this.item))// || (
        // isCharacterEnhancedItem(this.item) && ['Weapon', 'Armor', 'Shield', 'Focus'].includes(this.item.type)
      // ))
    }

    get equipmentPath () {
      return this.isCustomEquipment ? 'customEquipment' : 'equipment'
    }

    get atAttunementLimit () {
      return this.isNotCustom(this.item) &&
        isCharacterEnhancedItem(this.item) &&
        !this.item.attuned &&
        this.attunement.current + (intersection(this.item.rarityOptions, ['Legendary', 'Artifact']).length > 0 ? 2 : 1) > this.attunement.maximum
    }

    startCase = startCase

    isNotCustom (item: CharacterLootType | CustomEquipmentType): item is CharacterLootType {
      return !this.isCustomEquipment
    }

    isCharacterEnhancedItem = isCharacterEnhancedItem

    updateQuantity (newQuantity: string) {
      const fixedQuantity = Math.max(0, parseInt(newQuantity) || 0)
      this.$emit('updateCharacter', { [this.equipmentPath]: { [this.index]: { quantity: fixedQuantity } } })
    }

    getWeaponDamage (weapon: CharacterWeaponType) {
      return weapon.damageNumberOfDice ? `${weapon.damageNumberOfDice}d${weapon.damageDieType} ${weapon.damageType}` : 'Special'
    }
  }
</script>

<template lang="pug">
  v-expansion-panel.equipmentPanel
    v-expansion-panel-header.pa-2 {{ item.name }} {{ item.quantity > 1 ? `(${item.quantity})` : '' }}
    v-expansion-panel-content.ma-2.caption
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
        v-col.d-flex.align-center
          v-btn(icon, @click="$emit('deleteCharacterProperty', { path: equipmentPath, index })")
            v-icon fa-trash
      v-row
        v-col(v-if="isCharacterEnhancedItem(this.item) && this.item.requiresAttunement").d-flex.align-center.justify-start
          strong Attuned
          v-checkbox(
            :input-value="item.attuned",
            hide-details,
            :disabled="atAttunementLimit",
            :indeterminate="atAttunementLimit",
            color="primary",
            :class="$style.checkbox",
            @change="isChecked => $emit('updateCharacter', { [equipmentPath]: { [index]: { attuned: isChecked } } })"
          ).ma-2
        v-col(v-if="!isCharacterEnhancedItem(item)")
          div #[strong Cost:] {{ item.cost }}
          div #[strong Weight:] {{ item.weight}}
        v-col(v-if="isEquippable").d-flex.align-center.justify-start
          strong Equipped
          v-checkbox(
            :input-value="item.equipped",
            hide-details,
            color="primary",
            :class="$style.checkbox",
            @change="isChecked => $emit('updateCharacter', { [equipmentPath]: { [index]: { equipped: isChecked } } })"
          ).ma-2
      template(v-if="!isCustomEquipment")
        template(v-if="item.isFound")
          div(v-if="!item.equipmentCategory")
            div
              i #[strong {{ startCase(item.type) }}] {{ item.subtype && '(' + item.subtype + ')' }}, {{ item.rarityText }}
          div(v-else-if="item.equipmentCategory === 'Armor'")
            div(v-if="item.armorClassification !== 'Shield'") #[strong {{ item.armorClassification }} Armor]
            div #[strong AC:] {{ item.ac }}
            div(v-if="item.stealthDisadvantage") #[strong Imposes Stealth Disadvantage]
            div(v-if="item.propertiesMap.Strength") #[strong Requires {{ item.propertiesMap.Strength }}]
          div(v-else-if="item.equipmentCategory === 'Weapon'")
            div #[strong {{ startCase(item.weaponClassification) }}]
            div #[strong Damage:] {{ getWeaponDamage(item) }}
            div
              strong Properties:
              LootWeaponsProperties(:propertyList="item.properties")
          VueMarkdown(v-if="item.description", :source="item.description")
          VueMarkdown(v-if="item.text", :source="item.text")
        div(v-else) Warning: No data found for this item. It may have been renamed or removed from the core rules. Consider changing it to a custom item.
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
