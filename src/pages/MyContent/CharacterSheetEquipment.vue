
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EquipmentType } from '@/types'
  import CharacterSheetSection from './CharacterSheetSection.vue'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'

  @Component({
    components: {
      CharacterSheetSection,
      CharacterSheetModifier
    }
  })
  export default class CharacterSheetEquipment extends Vue {
    @Prop(Array) readonly equipment!: EquipmentType[]
    @Prop(Number) readonly credits!: number
  }
</script>

<template lang="pug">
  CharacterSheetSection
    h5 {{ credits }} Credits
    h3 Equipment
    v-expansion-panel
      v-expansion-panel-content(
        v-for="item in equipment",
        :key="item.name",
        class="equipmentPanel"
      )
        template(v-slot:header)
          div {{ item.name }} {{ item.quantity > 1 ? `(${item.quantity})` : '' }}
        div.ma-2.caption
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
