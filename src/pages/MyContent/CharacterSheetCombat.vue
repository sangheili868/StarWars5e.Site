<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import addPlus from '@/utilities/addPlus'
  import { GearType, WeaponType, ArmorType } from '@/types'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetWeapon from './CharacterSheetWeapon.vue'

  @Component({
    components: {
      CharacterSheetSection,
      CharacterSheetModifier,
      CharacterSheetWeapon
    }
  })
  export default class CharacterSheetCombat extends Vue {
    @Prop(Number) readonly proficiencyBonus!: number
    @Prop(Number) readonly initiative!: number
    @Prop(Number) readonly armorClass!: number
    @Prop(String) readonly speed!: string
    @Prop(Array) readonly items!: ((GearType | WeaponType | ArmorType) & { equipped: boolean })[]

    get weapons () {
      return this.items.filter(({ equipped, equipmentCategory }) => equipped && equipmentCategory === 'Weapon')
    }

    get armor () {
      return this.items.filter(({ equipped, equipmentCategory }) => equipped && equipmentCategory === 'Armor')
        .map(({ name }) => name)
        .join(', ')
    }
  }
</script>

<template lang="pug">
  CharacterSheetSection
    CharacterSheetModifier(:modifier="proficiencyBonus", label="Proficiency")
    CharacterSheetModifier(:modifier="initiative", label="Initiative")
    CharacterSheetModifier(:modifier="armorClass", label="Armor Class", isFlatNumber)
      div.caption {{ armor }}
    CharacterSheetModifier(:modifier="parseInt(speed)", label="Speed", isFlatNumber)
    h3 Weapons
    CharacterSheetWeapon(
      v-for="weapon in weapons",
      :key="weapon.name"
      v-bind="{ weapon }"
    )
</template>
