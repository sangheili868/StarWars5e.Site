<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import addPlus from '@/utilities/addPlus'
  import { GearType, WeaponType, ArmorType } from '@/types'

  @Component({
    components: {
      CharacterSheetSection
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
    }
  }
</script>

<template lang="pug">
  CharacterSheetSection
    div Prof: {{ proficiencyBonus }}
    div Init: {{ initiative }}
    div AC: {{ armorClass }}
    div Armor: {{ armor }}
    div Speed: {{ speed }}
    div Weapons: {{ weapons }}
</template>
