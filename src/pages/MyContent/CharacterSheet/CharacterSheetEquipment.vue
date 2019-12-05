
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'
  import CharacterSheetEquipmentPanel from './CharacterSheetEquipmentPanel.vue'
  import CharacterSheetEquipmentAdder from './CharacterSheetEquipmentAdder.vue'
  import ValueEditor from '@/components/ValueEditor.vue'

  @Component({
    components: {
      CharacterSheetEquipmentPanel,
      CharacterSheetEquipmentAdder,
      ValueEditor
    }
  })
  export default class CharacterSheetEquipment extends Vue {
    @Prop(Array) readonly equipment!: EquipmentType[]
    @Prop(Number) readonly credits!: number
  }
</script>

<template lang="pug">
  div
    h3 Equipment
    ValueEditor(:value="credits", label="Credits", @input="credits => $emit('updateCharacter', { credits })")
    v-expansion-panels(accordion, multiple)
      CharacterSheetEquipmentPanel(
        v-for="(item, index) in equipment",
        :key="item.name",
        v-bind="{ item, index }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
        @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)"
      )
    CharacterSheetEquipmentAdder(
      :position="equipment.length",
      @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)"
    )
</template>
