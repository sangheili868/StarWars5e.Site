<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'
  import addPlus from '@/utilities/addPlus'
  import LootWeaponsProperties from '@/pages/Loot/LootWeaponsProperties.vue'
  import { TweaksType } from '@/types/rawCharacterTypes'
  import CharacterSheetTweakMultiple from './CharacterSheetTweakMultiple.vue'

  @Component({
    components: {
      LootWeaponsProperties,
      CharacterSheetTweakMultiple
    }
  })
  export default class CharacterSheetWeapon extends Vue {
    @Prop(Object) readonly weapon!: EquipmentType
    @Prop(Object) readonly tweaks!: TweaksType

    addPlus = addPlus

    get tweakPaths (): { name: string, path: string, type?: 'dice' }[] {
      return this.weapon.name === 'Unarmed Strike' ? [
        { name: 'Unarmed Damage Dice', path: 'unarmed.damageDice', type: 'dice' },
        { name: 'Unarmed To Hit', path: 'unarmed.toHit' },
        { name: 'Unarmed Damage Bonus', path: 'unarmed.damage' }
      ] : []
    }

    get damage () {
      const { damageNumberOfDice, damageDieType, damageBonus, damageType } = this.weapon
      const hasDice = damageNumberOfDice && damageDieType
      const damage = hasDice ? damageNumberOfDice + 'd' + damageDieType + addPlus(damageBonus || 0) : damageBonus
      return damage + ' ' + 'Lightning'
    }
  }
</script>

<template lang="pug">
  div.d-flex.flex-column
    CharacterSheetTweakMultiple(
      v-bind="{ tweaks, tweakPaths }",
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
