
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types/lootTypes'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'

  @Component({
    components: {
      CharacterSheetModifier
    }
  })
  export default class CharacterSheetEquipment extends Vue {
    @Prop(Array) readonly equipment!: EquipmentType[]
    @Prop(Number) readonly credits!: number
  }
</script>

<template lang="pug">
  div
    h5 Credits: {{ credits }}
    h3 Equipment
    v-expansion-panels
      v-expansion-panel(
        v-for="item in equipment",
        :key="item.name",
        class="equipmentPanel"
      )
        v-expansion-panel-header {{ item.name }} {{ item.quantity > 1 ? `(${item.quantity})` : '' }}
        v-expansion-panel-content.ma-2.caption
          div Cost: {{ item.cost }}
          div Weight: {{ item.weight}}
          br
          div {{ item.description }}
</template>

<style lang="scss">
  .equipmentPanel .v-expansion-panel__header {
    min-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
