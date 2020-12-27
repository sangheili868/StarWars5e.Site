<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CharacteristicsType } from '@/types/completeCharacterTypes'
  import { startCase } from 'lodash'
  import TextEditor from '@/components/TextEditor.vue'

  @Component({
    components: {
      TextEditor
    }
  })
  export default class CharacterSheetDescription extends Vue {
    @Prop(String) readonly alignment!: string
    @Prop(String) readonly background!: string
    @Prop(Array) readonly proficiencies!: string[]
    @Prop(Array) readonly languages!: string[]
    @Prop(Object) readonly characteristics!: CharacteristicsType
    startCase = startCase

    editing = ''
  }
</script>

<template lang="pug">
  div.text-left
    h3 Description
    v-list(dense)
      v-list-item-group
        v-list-item(@click="editing=''")
          v-list-item-content
            v-list-item-title
              div #[strong Background]: {{ background }}
        v-list-item(
          v-for="(value, characteristic) in characteristics",
          :key="characteristic",
          :ripple="editing !== characteristic"
          @click="editing=characteristic"
        )
          v-list-item-content
            v-list-item-title
              TextEditor(
                :label="startCase(characteristic)",
                v-bind="{ value }",
                :isEditing="editing === characteristic"
                @input="newValue => $emit('updateCharacter', { characteristics: { [characteristic]: newValue } })"
                @close.stop="editing=''"
              )
</template>
