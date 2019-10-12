
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'
  import CharacterSheetEquipmentPanel from './CharacterSheetEquipmentPanel.vue'

  @Component({
    components: {
      CharacterSheetEquipmentPanel
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
    h5 Credits: {{ credits }}
    v-expansion-panels(accordion, multiple)
      CharacterSheetEquipmentPanel(
        v-for="(item, index) in equipment",
        :key="item.name",
        v-bind="{ item, index }",
        @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
        @deleteCharacterProperty="(path, index) => $emit('deleteCharacterProperty', path, index)"
      )
</template>
