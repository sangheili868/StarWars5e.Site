<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import addPlus from '@/utilities/addPlus'
  import { EquipmentType } from '@/types/lootTypes'
  import { SuperiorityType, CompletedFeatureType, CharacterLootType, CustomWeaponType, CharacterWeaponType } from '@/types/completeCharacterTypes'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'
  import CharacterSheetWeapon from './CharacterSheetWeapon.vue'
  import CharacterSheetSuperiority from './CharacterSheetSuperiority.vue'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import CharacterSheetCustomFeatures from './CharacterSheetCustomFeatures.vue'
  import CharacterSheetCustomFeats from './CharacterSheetCustomFeats.vue'
  import { CustomEquipmentType, TweaksType } from '@/types/rawCharacterTypes'

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
    @Prop(Array) readonly armorList!: string[]
    @Prop(Object) readonly speed!: { base: string }
    @Prop(Array) readonly equipment!: CharacterLootType[]
    @Prop(Array) readonly customEquipment!: CustomEquipmentType[]
    @Prop(Array) readonly weapons!: (CharacterWeaponType | CustomWeaponType)[]
    @Prop(Number) readonly passivePerception!: number
    @Prop({ type: [ Boolean, Object ] }) readonly superiority!: false | SuperiorityType
    @Prop(Array) readonly combatFeatures!: CompletedFeatureType[]
    @Prop(Array) readonly customFeatures!: { name: string, content: string }[]
    @Prop(Number) readonly numCustomFeats!: number
    @Prop(Object) readonly tweaks!: TweaksType

    weaponTweakPaths = [
      { name: 'To Hit', path: 'weapon.toHit' },
      { name: 'Damage Bonus', path: 'weapon.damage' }
    ]
  }
</script>

<template lang="pug">
  div
    CharacterSheetModifier(
      :value="proficiencyBonus",
      label="Proficiency Bonus",
      addPlus,
      v-bind="{ tweaks }",
      tweakPath="proficiencyBonus",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    CharacterSheetModifier(
      :value="initiative",
      label="Initiative",
      addPlus,
      v-bind="{ tweaks }",
      tweakPath="initiative",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    CharacterSheetModifier(
      :value="armorClass",
      label="Armor Class",
      v-bind="{ tweaks }",
      tweakPath="armorClass",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
      div.text-caption {{ armorList.join(', ') }}
    CharacterSheetModifier(
      :value="parseInt(speed.base)"
      label="Speed",
      v-bind="{ tweaks }",
      tweakPath="speed.base",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    CharacterSheetModifier(
      :value="passivePerception",
      label="Passive Perception",
      v-bind="{ tweaks }",
      tweakPath="passivePerception",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    h3.mt-2.d-flex.justify-space-between.align-end Weapons
      CharacterSheetTweaker(
        v-bind="{ tweaks }",
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
    div(v-if="!weapons.length").text-caption Equip weapons by selecting them in the Equipment section
    CharacterSheetSuperiority(
      v-if="superiority"
      v-bind="{ superiority, tweaks }",
      @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)"
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
    h3.mt-2.d-flex.justify-space-between.align-end Features
      CharacterSheetCustomFeats(
        v-bind="{ combatFeatures, numCustomFeats }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
        @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
      )
    CharacterSheetExpansionFeatures(
      :features="combatFeatures", @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @deleteFeature="({ customIndex }) => $emit('deleteCharacterProperty', { path: 'customFeats', index: customIndex })"
    )
    CharacterSheetCustomFeatures(
      :features="customFeatures",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
    )
</template>
