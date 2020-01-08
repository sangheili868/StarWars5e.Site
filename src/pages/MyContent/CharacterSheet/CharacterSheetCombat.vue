<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import addPlus from '@/utilities/addPlus'
  import { EquipmentType } from '@/types/lootTypes'
  import { SuperiorityType, CompletedFeatureType } from '@/types/completeCharacterTypes'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'
  import CharacterSheetWeapon from './CharacterSheetWeapon.vue'
  import CharacterSheetSuperiority from './CharacterSheetSuperiority.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import CharacterSheetCustomFeatures from './CharacterSheetCustomFeatures.vue'
  import CharacterSheetCustomFeats from './CharacterSheetCustomFeats.vue'

  @Component({
    components: {
      CharacterSheetModifier,
      CharacterSheetTweaker,
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

    weaponTweakPaths = [
      { name: 'To Hit', path: 'weapon.toHit' },
      { name: 'Damage Bonus', path: 'weapon.damage' }
    ]

    get armor () {
      return this.equipment.filter(({ equipped, equipmentCategory }) => equipped && equipmentCategory === 'Armor')
        .map(({ name }) => name)
        .join(', ')
    }
  }
</script>

<template lang="pug">
  div
    CharacterSheetModifier(
      :value="proficiencyBonus",
      label="Proficiency Bonus",
      addPlus,
      tweakPath="proficiencyBonus",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    CharacterSheetModifier(
      :value="initiative",
      label="Initiative",
      addPlus,
      tweakPath="initiative",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    CharacterSheetModifier(
      :value="armorClass",
      label="Armor Class",
      tweakPath="armorClass",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
      div.caption {{ armor }}
    CharacterSheetModifier(
      :value="parseInt(speed.base)"
      label="Speed",
      tweakPath="speed.base",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    CharacterSheetModifier(
      :value="passivePerception",
      label="Passive Perception",
      tweakPath="passivePerception",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    h3.mt-2.d-flex.justify-space-between.align-end Weapons
      CharacterSheetTweaker(
        title="Global Weapon Modifiers",
        noStyle,
        :tweakPaths="weaponTweakPaths",
        @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
      )
        v-btn(icon, color="primary")
          v-icon fa-edit
    CharacterSheetWeapon(
      v-for="(weapon, index) in weapons",
      :key="index",
      v-bind="{ weapon }",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    div(v-if="!weapons.length").caption Equip weapons by selecting them in the Equipment section
    CharacterSheetSuperiority(
      v-if="superiority"
      v-bind="{ superiority }"
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
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
