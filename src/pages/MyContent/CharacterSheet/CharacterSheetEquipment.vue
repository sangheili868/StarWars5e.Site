
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
    @Prop(Boolean) readonly isBuilder!: boolean
  }
</script>

<template lang="pug">
  div
    h3(v-if="!isBuilder") Equipment
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
</template>
