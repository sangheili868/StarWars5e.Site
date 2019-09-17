<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'
  import addPlus from '@/utilities/addPlus'
  import LootWeaponsProperties from '@/pages/Loot/LootWeaponsProperties.vue'

  @Component({
    components: {
      LootWeaponsProperties
    }
  })
  export default class CharacterSheetWeapon extends Vue {
    @Prop(Object) readonly weapon!: EquipmentType
    addPlus = addPlus

    get damage () {
      return this.weapon.damageNumberOfDice +
        'd' + this.weapon.damageDieType +
        addPlus(this.weapon.damageBonus || 0) +
        ' ' + this.weapon.damageType
    }
  }
</script>

<template lang="pug">
  div.text-xs-left
    div(:class="$style.name")
      h4 {{ weapon.name }}
      div {{ addPlus(weapon.attackBonus) }}
      div {{ damage }}
    LootWeaponsProperties(:propertyList="weapon.properties").caption
</template>

<style lang="scss" module>
  .name {
    display: flex;
    justify-content: space-between;
  }
</style>
