
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'
  import { CustomEquipmentType } from '@/types/rawCharacterTypes'
  import CharacterSheetEquipmentPanel from './CharacterSheetEquipmentPanel.vue'
  import CharacterSheetEquipmentAdder from './CharacterSheetEquipmentAdder.vue'
  import CharacterSheetEquipmentCustomAdder from './CharacterSheetEquipmentCustomAdder.vue'
  import ValueEditor from '@/components/ValueEditor.vue'

  @Component({
    components: {
      CharacterSheetEquipmentPanel,
      CharacterSheetEquipmentAdder,
      CharacterSheetEquipmentCustomAdder,
      ValueEditor
    }
  })
  export default class CharacterSheetEquipment extends Vue {
    @Prop(Array) readonly equipment!: EquipmentType[]
    @Prop(Array) readonly customEquipment!: CustomEquipmentType[]
    @Prop(Number) readonly credits!: number
    @Prop(Boolean) readonly isBuilder!: boolean
  }
</script>

<template lang="pug">
  div
    template(v-if="isBuilder")
      ValueEditor(:value="credits", label="Credits", @input="credits => $emit('updateCharacter', { credits })")
      h3.mt-3.text-left.d-flex.justify-space-between.align-end Equipment
        CharacterSheetEquipmentAdder(
          :position="equipment.length",
          @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
        )
    template(v-else)
      h3 Equipment
      div.my-2.d-flex.justify-space-between
        ValueEditor(:value="credits", label="Credits", @input="credits => $emit('updateCharacter', { credits })")
        CharacterSheetEquipmentAdder(
          :position="equipment.length",
          @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
        )
    v-expansion-panels(accordion, multiple)
      CharacterSheetEquipmentPanel(
        v-for="(item, index) in equipment",
        :key="index",
        v-bind="{ item, index }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
        @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
      )
    h3.mt-3.text-left.d-flex.justify-space-between.align-end Custom Items
      CharacterSheetEquipmentCustomAdder(
        :position="customEquipment.length",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
      )
    v-expansion-panels(accordion, multiple)
      CharacterSheetEquipmentPanel(
        v-for="(item, index) in customEquipment",
        isCustomEquipment,
        :key="index",
        v-bind="{ item, index }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
        @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
      )
</template>
