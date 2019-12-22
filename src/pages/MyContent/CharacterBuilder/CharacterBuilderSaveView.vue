<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import JSONWriter from '@/components/JSONWriter.vue'
  import { CharacterValidationType } from '@/types/utilityTypes'

  @Component({
    components: {
      JSONWriter
    }
  })
  export default class CharacterBuilderSaveView extends Vue {
    @Prop(Object) readonly character!: RawCharacterType
    @Prop(Object) readonly characterValidation!: CharacterValidationType
  }
</script>

<template lang="pug">
  div
    JSONWriter(:jsonData="character", :filename="character.name || 'incompleteCharacter'", @save="$emit('save')").ma-2 Save Character
    v-tooltip(top, :disabled="characterValidation.code === 0")
      template(v-slot:activator="{ on }")
        span(v-on="on")
          v-btn(
            color="primary",
            to="characterSheet",
            :disabled="characterValidation.code > 0"
          ).ma-2 Character Sheet
      div {{ characterValidation.message }}
</template>
