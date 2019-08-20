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
    @Prop(Array) readonly equipment!: ((GearType | WeaponType | ArmorType) & { equipped: boolean })[]
    @Prop(Number) readonly passivePerception!: number

    get weapons () {
      return this.equipment.filter(({ equipped, equipmentCategory }) => equipped && equipmentCategory === 'Weapon')
    }

    get armor () {
      return this.equipment.filter(({ equipped, equipmentCategory }) => equipped && equipmentCategory === 'Armor')
        .map(({ name }) => name)
        .join(', ')
    }
  }
</script>

<template lang="pug">
  CharacterSheetSection
    CharacterSheetModifier(:modifier="proficiencyBonus", label="Proficiency", small)
    CharacterSheetModifier(:modifier="initiative", label="Initiative", small)
    CharacterSheetModifier(:modifier="armorClass", label="Armor Class", isFlatNumber, small)
      div.caption {{ armor }}
    CharacterSheetModifier(:modifier="parseInt(speed)", label="Speed", isFlatNumber, small)
    CharacterSheetModifier(:modifier="passivePerception", label="Passive Perception", isFlatNumber, small)
    h3 Weapons
    CharacterSheetWeapon(
      v-for="weapon in weapons",
      :key="weapon.name"
      v-bind="{ weapon }"
    )
</template>
