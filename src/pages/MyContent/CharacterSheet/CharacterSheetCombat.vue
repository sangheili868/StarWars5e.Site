<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import addPlus from '@/utilities/addPlus'
  import { EquipmentType } from '@/types/lootTypes'
  import { SuperiorityType, CompletedFeatureType } from '@/types/completeCharacterTypes'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetWeapon from './CharacterSheetWeapon.vue'
  import CharacterSheetSuperiority from './CharacterSheetSuperiority.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'

  @Component({
    components: {
      CharacterSheetModifier,
      CharacterSheetWeapon,
      CharacterSheetSuperiority,
      CharacterSheetExpansionFeatures
    }
  })
  export default class CharacterSheetCombat extends Vue {
    @Prop(Number) readonly proficiencyBonus!: number
    @Prop(Number) readonly initiative!: number
    @Prop(Number) readonly armorClass!: number
    @Prop(Object) readonly speed!: { base: string }
    @Prop(Array) readonly equipment!: EquipmentType[]
    @Prop(Number) readonly passivePerception!: number
    @Prop(Object) readonly superiority!: SuperiorityType
    @Prop(Array) readonly combatFeatures!: CompletedFeatureType[]

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
  div
    CharacterSheetModifier(:modifier="proficiencyBonus", label="Proficiency", small)
    CharacterSheetModifier(:modifier="initiative", label="Initiative", small)
    CharacterSheetModifier(:modifier="armorClass", label="Armor Class", isFlatNumber, small)
      div.caption {{ armor }}
    CharacterSheetModifier(:modifier="parseInt(speed.base)", label="Speed", isFlatNumber, small)
    CharacterSheetModifier(:modifier="passivePerception", label="Passive Perception", isFlatNumber, small)
    h3.mt-2 Weapons
    CharacterSheetWeapon(
      v-for="weapon in weapons",
      :key="weapon.name"
      v-bind="{ weapon }"
    )
    CharacterSheetSuperiority(
      :superiority="superiority",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
    )
    h3.mt-2 Combat Features
    CharacterSheetExpansionFeatures(
      :features="combatFeatures",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
    )
</template>
