<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import CharacterSheetEquipment from '@/pages/Tools/CharacterSheet/CharacterSheetEquipment.vue'
  import generateEquipment from '@/modules/CharacterEngine/generateEquipment'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { EquipmentType, EnhancedItemType } from '@/types/lootTypes'
  import generateAttunement from '@/modules/CharacterEngine/generateAttunement'
  import applyTweak from '@/utilities/applyTweak'

  const equipmentModule = namespace('equipment')
  const enhancedItemsModule = namespace('enhancedItems')

  @Component({
    components: {
      CharacterSheetEquipment
    }
  })
  export default class CharacterBuilderEquipment extends Vue {
    @Prop(Object) readonly rawCharacter!: RawCharacterType

    @equipmentModule.State equipment!: EquipmentType[]
    @enhancedItemsModule.State enhancedItems!: EnhancedItemType[]

    get myEquipment () {
      return generateEquipment(this.rawCharacter, this.equipment, this.enhancedItems)
    }

    get myAttunement () {
      const currentLevel = this.rawCharacter.classes.reduce((acc, { levels }) => acc + levels, 0)
      const proficiencyBonus = applyTweak(this.rawCharacter, 'proficiencyBonus', 1 + Math.ceil(currentLevel / 4))
      return generateAttunement(this.myEquipment, proficiencyBonus)
    }
  }
</script>

<template lang="pug">
  div
    h1 Choose Equipment
    CharacterSheetEquipment(
      :equipment="myEquipment",
      :customEquipment="rawCharacter.customEquipment",
      :credits="rawCharacter.credits",
      :attunement="myAttunement",
      isBuilder,
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
      @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
    ).mb-3
</template>
