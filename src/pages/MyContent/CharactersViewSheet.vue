<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CharacterValidationType } from '@/types/utilityTypes'

  @Component
  export default class CharactersViewSheet extends Vue {
    @Prop(Object) readonly characterValidation!: CharacterValidationType
  }
</script>

<template lang="pug">
  v-tooltip(top, :disabled="characterValidation.code === 0")
    template(v-slot:activator="{ on }")
      span(v-on="on")
        v-btn(
          color="primary",
          :disabled="characterValidation.code > 0",
          @click="$emit('click')"
        ).ma-2 Character Sheet
    div {{ characterValidation.message }}
</template>
