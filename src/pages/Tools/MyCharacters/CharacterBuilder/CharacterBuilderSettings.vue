<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { RawCharacterType, AbilityScoreMethodType } from '@/types/rawCharacterTypes'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { CharacterValidationType } from '@/types/utilityTypes'
  import BooleanSelect from '@/components/BooleanSelect.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import CharacterMenu from '../CharacterMenu.vue'

  @Component({
    components: {
      MyDialog,
      ConfirmDelete,
      CharacterMenu,
      BooleanSelect
    }
  })
  export default class CharacterBuilderSettings extends Vue {
    @Prop(Object) readonly rawCharacter!: RawCharacterType
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    @Prop(Object) readonly characterValidation!: CharacterValidationType
    @Prop(Boolean) readonly isDirty!: boolean
    isOpen = false

    handleChangeMethod (newMethod: AbilityScoreMethodType) {
      this.$emit('updateCharacter', {
        baseAbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0
        },
        settings: { abilityScoreMethod: newMethod }
      })
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-badge(:value="isDirty", color="primary", overlap)
        template(v-slot:badge)
          v-icon.white--text fa-exclamation
        v-btn(icon, large, v-on="on").ml-3
          v-icon fa-cog
    template(#title) Character Builder Settings
    template(#text)
      CharacterMenu(
        v-bind="{ completeCharacter, rawCharacter, characterValidation }",
        @setClean="$emit('setClean')",
        @deleteCharacter="$emit('deleteCharacter')"
      )
        v-container
          v-row(v-if="isDirty", align="center", no-gutters).mb-2.d-flex.justify-space-between.align-center
            v-btn(color="primary", @click="$emit('saveCharacter')") Save Character
            div.primary--text Character has unsaved changes!
          v-row(align="center", no-gutters).mb-2
            v-col Hit Points Calculation
            v-col(cols="8", sm="6").d-flex.justify-center
              BooleanSelect(
                :value="rawCharacter.settings.isFixedHitPoints",
                outlined,
                hide-details,
                trueValue="Fixed",
                falseValue="Manual"
                @input="isFixedHitPoints => $emit('updateCharacter', { settings: { isFixedHitPoints } })"
              )
          v-row(align="center", no-gutters).mb-2
            v-col Ability Score Calculation
            v-col(cols="8", sm="6").d-flex.justify-center
              v-select(
                outlined,
                hide-details,
                :value="rawCharacter.settings.abilityScoreMethod"
                :items="[ 'Standard Array', 'Point Buy', 'Manual' ]",
                @change="handleChangeMethod"
              )
          v-row(align="center", no-gutters).mb-2
            v-col Force Power Prerequisites
            v-col(cols="8", sm="6").d-flex.justify-center
              BooleanSelect(
                :value="rawCharacter.settings.isEnforcingForcePrerequisites",
                outlined,
                hide-details,
                trueValue="Enforce",
                falseValue="Ignore"
                @input="isEnforcingForcePrerequisites => $emit('updateCharacter', { settings: { isEnforcingForcePrerequisites } })"
              )
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
