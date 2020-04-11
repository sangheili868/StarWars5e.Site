<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { EquipmentType } from '@/types/lootTypes'
  import { CustomEquipmentCategoryType } from '@/types/rawCharacterTypes'
  import { chain, startCase } from 'lodash'
  import MySelect from '@/components/MySelect.vue'

  @Component({
    components: {
      MyDialog,
      MySelect
    }
  })
  export default class CharacterSheetEquipmentCustomAdder extends Vue {
    @Prop(Number) readonly position!: number

    isOpen = false
    name = ''
    equipmentCategory: CustomEquipmentCategoryType = 'Gear'
    quantity = 1
    cost = 0
    description = ''
    weight = 1
    damageType = 'Kinetic'
    diceSize = 4
    toHit = 0
    damage = 0
    equipped = false
    damageNumberOfDice = 1

    get isEquippable () {
      return ['Weapon', 'Armor'].includes(this.equipmentCategory)
    }

    get diceSizes () {
      return [4, 6, 8, 10, 12].map(value => ({ text: 'd' + value, value }))
    }

    resetValues () {
      this.equipmentCategory = 'Gear'
      this.quantity = 1
      this.equipped = false
      this.damageType = 'Kinetic'
      this.description = ''
      this.weight = 1
      this.cost = 0
      this.name = ''
      this.toHit = 0
      this.damage = 0
      this.damageNumberOfDice = 1
      this.diceSize = 4
    }

    addItem () {
      this.$emit('updateCharacter', { customEquipment: { [this.position]: {
        name: this.name,
        quantity: this.quantity,
        equipmentCategory: this.equipmentCategory,
        cost: this.cost,
        description: this.description,
        weight: this.weight,
        ...(this.equipmentCategory === 'Weapon' ? {
          damageType: this.damageType,
          damageNumberOfDice: this.damageNumberOfDice,
          tweaks: {
            toHit: { override: this.toHit },
            damageDice: { diceSize: this.diceSize },
            damage: { override: this.damage }
          }
        } : {}),
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
    template(#title) Add a Custom Item
    template(#text)
      v-container
        v-row
          v-col(cols="2").font-weight-bold.d-flex.align-center Name
          v-col
            v-text-field(v-model="name", autofocus, outlined, single-line, hide-details)
        v-row
          v-col(cols="2").font-weight-bold.d-flex.align-center Type
          v-col
            MySelect(v-model="equipmentCategory", :items="['Weapon', 'Armor', 'Gear']")
        v-row
          v-col(cols="2").font-weight-bold.d-flex.align-center Cost
          v-col(cols="4")
            v-text-field(v-model="cost", outlined, single-line, hide-details, type="number").mx-2
          v-col(cols="2").font-weight-bold.d-flex.align-center Weight
          v-col(cols="4")
            v-text-field(v-model="weight", outlined, single-line, hide-details, type="number").mx-2
        v-row
          v-col(cols="2").font-weight-bold.d-flex.align-center Quantity
          v-col(cols="4")
            v-text-field(v-model="quantity", outlined, single-line, hide-details, type="number").mx-2
          v-col(cols="6", v-if="isEquippable")
            v-checkbox(v-model="equipped", hide-details, color="primary", label="Equipped").ma-2
        template(v-if="equipmentCategory === 'Weapon'")
          v-row
            v-col(cols="2").font-weight-bold.d-flex.align-center To Hit
            v-col(cols="4'")
              v-text-field(v-model.number="toHit", outlined, type="number", hide-details)
            v-col(cols="2").font-weight-bold.d-flex.align-center Damage Bonus
            v-col(cols="4")
              v-text-field(v-model.number="damage", outlined, type="number", hide-details)
          v-row
            v-col(cols="3").font-weight-bold.d-flex.align-center Damage Dice Count
            v-col(cols="3")
              v-text-field(v-model.number="damageNumberOfDice", outlined, type="number", hide-details)
            v-col(cols="3").font-weight-bold.d-flex.align-center Damage Dice Size
            v-col(cols="3")
              v-select(v-model.number="diceSize", outlined, :items="diceSizes", hide-details)
          v-row
            v-col(cols="4").font-weight-bold.d-flex.align-center Damage Type
            v-col(cols="8")
              v-text-field(v-model="damageType", outlined, single-line, hide-details)
      div.font-weight-bold Description
      v-textarea(outlined, hide-details, v-model="description")
    template(#actions)
      v-btn(color="primary", :disabled="!name && quantity > 0", @click="addItem") Add
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
