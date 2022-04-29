<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { AbilityScoresType } from '@/types/completeCharacterTypes'
  import { EquipmentType } from '@/types/lootTypes'
  import { CustomEquipmentType } from '@/types/rawCharacterTypes'
  import generateCarryingCapacity from '@/modules/CharacterEngine/generateCarryingCapacity'
  import generateEquipmentWeight from '@/modules/CharacterEngine/generateEquipmentWeight'
  import ValueEditor from '@/components/ValueEditor.vue'

  @Component({
    components: {
      ValueEditor
    }
  })
  export default class CharacterSheetEquipmentWeight extends Vue {
    @Prop(Array) readonly equipment!: EquipmentType[]
    @Prop(Array) readonly customEquipment!: CustomEquipmentType[]
    @Prop(Object) readonly abilityScores!: AbilityScoresType

    get carryingCapacity () {
      return generateCarryingCapacity(this.abilityScores)
    }

    get equipmentWeight (): number {
      return generateEquipmentWeight(this.equipment, this.customEquipment)
    }
  }
</script>

<template lang="pug">
  div
    div.d-flex.align-center.mt-3
      h4.mt-1.mr-2.text-center Weight
      h5.text-center {{ equipmentWeight }} / {{ carryingCapacity.encumbered }}
      h5(
        v-if="equipmentWeight > carryingCapacity.encumbered && equipmentWeight <= carryingCapacity.heavilyEncumbered"
      ).ml-2.text-center (Encumbered)
      h5(
        v-if="equipmentWeight > carryingCapacity.heavilyEncumbered"
      ).ml-2.text-center (Heavily Encumbered)
</template>

<style lang="scss" module>
  .checkbox {
    flex: none !important;
    margin-top: 0 !important;
  }
</style>
