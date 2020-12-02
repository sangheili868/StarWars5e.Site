<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { RawCharacterType, AbilityScoreMethodType } from '@/types/rawCharacterTypes'
  import BooleanSelect from '@/components/BooleanSelect.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'

  @Component({
    components: {
      MyDialog,
      ConfirmDelete,
      BooleanSelect
    }
  })
  export default class CharacterBuilderSettings extends Vue {
    @Prop(Object) readonly rawCharacter!: RawCharacterType
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
          v-icon fa-exclamation
        v-btn(icon, large, v-on="on")
          v-icon fa-cog
    template(#title) Character Builder Settings
    template(#text)
      v-container.black--text
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
        v-row(align="center", no-gutters).mb-2
          ConfirmDelete(
            :label="rawCharacter.name || 'Unnamed Character'",
            :item="rawCharacter.name || 'Unnamed Character'",
            @delete="$emit('deleteCharacter')"
          )
            template(v-slot="{ on }")
              v-btn(color="red", v-on="on").white--text.mt-5
                v-icon.mr-3 fa-skull-crossbones
                | Delete Character
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
