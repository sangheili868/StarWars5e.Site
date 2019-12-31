<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import addPlus from '@/utilities/addPlus'
  import { EquipmentType } from '@/types/lootTypes'
  import { SuperiorityType, CompletedFeatureType } from '@/types/completeCharacterTypes'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetWeapon from './CharacterSheetWeapon.vue'
  import CharacterSheetSuperiority from './CharacterSheetSuperiority.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import CharacterSheetCustomFeatures from './CharacterSheetCustomFeatures.vue'
  import CharacterSheetCustomFeats from './CharacterSheetCustomFeats.vue'

  @Component({
    components: {
      CharacterSheetModifier,
      CharacterSheetWeapon,
      CharacterSheetSuperiority,
      CharacterSheetExpansionFeatures,
      CharacterSheetCustomFeatures,
      CharacterSheetCustomFeats
    }
  })
  export default class CharacterSheetCombat extends Vue {
    @Prop(Number) readonly proficiencyBonus!: number
    @Prop(Number) readonly initiative!: number
    @Prop(Number) readonly armorClass!: number
    @Prop(Object) readonly speed!: { base: string }
    @Prop(Array) readonly equipment!: EquipmentType[]
    @Prop(Array) readonly weapons!: EquipmentType[]
    @Prop(Number) readonly passivePerception!: number
    @Prop({ type: [ Boolean, Object ] }) readonly superiority!: false | SuperiorityType
    @Prop(Array) readonly combatFeatures!: CompletedFeatureType[]
    @Prop(Array) readonly customFeatures!: { name: string, content: string }[]
    @Prop(Number) readonly numCustomFeats!: number

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
    div(v-if="!weapons.length").caption Equip weapons by selecting them in the Equipment section
    CharacterSheetSuperiority(
      v-if="superiority"
      :superiority="superiority",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
    )
    h3.mt-2.d-flex.justify-space-between.align-end Feats
      CharacterSheetCustomFeats(
        v-bind="{ combatFeatures, numCustomFeats }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
        @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
      )
    CharacterSheetExpansionFeatures(
      :features="combatFeatures",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @deleteFeature="({ customIndex }) => $emit('deleteCharacterProperty', { path: 'customFeats', index: customIndex })"
    )
    CharacterSheetCustomFeatures(
      :features="customFeatures",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
    )
</template>
