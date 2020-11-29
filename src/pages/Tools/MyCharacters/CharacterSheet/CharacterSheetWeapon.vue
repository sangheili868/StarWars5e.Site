<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'
  import addPlus from '@/utilities/addPlus'
  import LootWeaponsProperties from '@/pages/Loot/LootWeaponsProperties.vue'
  import { TweakPathType, CustomEquipmentType } from '@/types/rawCharacterTypes'
  import CharacterSheetTweaker from './CharacterSheetTweaker.vue'
  import { CustomWeaponType, CharacterWeaponType } from '@/types/completeCharacterTypes'

  @Component({
    components: {
      LootWeaponsProperties,
      CharacterSheetTweaker
    }
  })
  export default class CharacterSheetWeapon extends Vue {
    @Prop(Object) readonly weapon!: CharacterWeaponType | CustomWeaponType

    addPlus = addPlus

    get rootPath () {
      const equipmentType = (this.weapon as CustomWeaponType).isCustom ? 'customEquipment' : 'equipment'
      return this.weapon.name === 'Unarmed Strike' ? 'tweaks.unarmed' : `${equipmentType}.${this.weapon.index}.tweaks`
    }

    get tweakPaths (): TweakPathType[] {
      return [
        { name: 'Damage Dice', path: 'damageDice', type: 'dice' },
        { name: 'To Hit', path: 'toHit' },
        { name: 'Damage Bonus', path: 'damage' }
      ]
    }

    get damage () {
      const { damageNumberOfDice, damageDieType, damageBonus, damageType } = this.weapon
      const hasDice = damageNumberOfDice && damageDieType
      const damageModifier = damageBonus ? addPlus(damageBonus) : ''
      const damage = hasDice ? damageNumberOfDice + 'd' + damageDieType + damageModifier : damageBonus
      return damage + ' ' + damageType
    }
  }
</script>

<template lang="pug">
  div.d-flex.flex-column
    CharacterSheetTweaker(
      v-bind="{ tweakPaths, rootPath }",
      :tweaks="weapon.tweaks",
      :title="weapon.name",
      @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
    )
      div.d-flex.justify-space-between
        h4.flex-grow-1 {{ weapon.name }}
        div(:class="$style.toHit").text-left {{ addPlus(weapon.attackBonus) }}
        div(:class="$style.damage").text-right {{ damage }}
    LootWeaponsProperties(:propertyList="weapon.properties").caption.px-1
</template>

<style module lang="scss">
  .toHit {
    min-width: 28px;
  }
  .damage {
    min-width: 140px;
  }
</style>
