<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import CharacterSheetEquipment from '@/pages/MyContent/CharacterSheet/CharacterSheetEquipment.vue'
  import generateEquipment from '@/modules/CharacterEngine/generateEquipment'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { EquipmentType } from '@/types/lootTypes'

  const equipmentModule = namespace('equipment')

  @Component({
    components: {
      CharacterSheetEquipment
    }
  })
  export default class CharacterBuilderEquipment extends Vue {
    @Prop(Object) readonly rawCharacter!: RawCharacterType

    @equipmentModule.State equipment!: EquipmentType[]
    @equipmentModule.Action fetchEquipment!: () => void

    get myEquipment () {
      return generateEquipment(this.rawCharacter, this.equipment)
    }
  }
</script>

<template lang="pug">
  div
    h1 Choose Equipment
    CharacterSheetEquipment(
      :equipment="myEquipment",
      :credits="rawCharacter.credits",
      isBuilder,
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
    ).mb-3
</template>
