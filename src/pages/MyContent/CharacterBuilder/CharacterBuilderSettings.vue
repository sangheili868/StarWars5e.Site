<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { RawCharacterType, AbilityScoreMethodType } from '@/types/rawCharacterTypes'
  import BooleanSelect from '@/components/BooleanSelect.vue'

  @Component({
    components: {
      MyDialog,
      BooleanSelect
    }
  })
  export default class CharacterBuilderSettings extends Vue {
    @Prop(Object) readonly rawCharacter!: RawCharacterType
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
      v-btn(icon, v-on="on")
        v-icon fa-cog
    template(#title) Character Builder Settings
    template(#text)
      v-container.black--text
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
        v-row(align="center", no-gutters).mb-2.d-none
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
