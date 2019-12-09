<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { RawClassType } from '@/types/rawCharacterTypes'

  @Component
  export default class CharacterBuilderClassASI extends Vue {
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Number) readonly index!: number

    get asi () {
      return this.myClass.abilityScoreImprovements[this.index]
    }

    handleChangeType (type: string) {
      const asi = type === 'Feat' ? { type, name: '' } : { type, abilitiesIncreased: [] }
      this.$emit('updateASI', asi)
    }
  }
</script>

<template lang="pug">
  div.d-flex
    v-autocomplete(
      :value="asi && asi.type",
      :items="['Ability Score Improvement', 'Feat']",
      placeholder="Choose an option",
      dense,
      hide-details,
      @input="handleChangeType"
    ).mx-2
    v-autocomplete(
      :value="asi && asi.type",
      :items="['Ability Score Improvement', 'Feat']"
    ).mx-2
</template>
