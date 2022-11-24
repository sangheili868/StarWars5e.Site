<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetAbilities from './CharacterSheetAbilities.vue'
  import CharacterSheetCombat from './CharacterSheetCombat.vue'
  import CharacterSheetCasting from './CharacterSheetCasting.vue'
  import CharacterSheetEquipment from './CharacterSheetEquipment.vue'
  import CharacterSheetDescription from './CharacterSheetDescription.vue'
  import CharacterSheetProficiencies from './CharacterSheetProficiencies.vue'
  import CharacterSheetNotes from './CharacterSheetNotes.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { isEmpty } from 'lodash'

  @Component({
    components: {
      CharacterSheetAbilities,
      CharacterSheetCombat,
      CharacterSheetCasting,
      CharacterSheetEquipment,
      CharacterSheetDescription,
      CharacterSheetProficiencies,
      CharacterSheetNotes
    }
  })
  export default class CharacterSheetSection extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    @Prop(Number) readonly currentTab!: number

    get sections () {
      return [
        {
          component: 'CharacterSheetAbilities',
          icon: 'fa-dice-d20'
        },
        {
          component: 'CharacterSheetCombat',
          icon: 'fa-fist-raised'
        },
        {
          component: 'CharacterSheetCasting',
          icon: 'fa-bolt'
        },
        {
          component: 'CharacterSheetEquipment',
          icon: 'fa-toolbox'
        },
        {
          component: 'CharacterSheetProficiencies',
          icon: 'fa-atlas'
        },
        {
          component: 'CharacterSheetDescription',
          icon: 'fa-user'
        },
        {
          component: 'CharacterSheetNotes',
          icon: 'fa-clipboard'
        }
      ]
    }
  }
</script>

<template lang="pug">
  v-card.pa-3
    div.d-flex.pb-2
      div(
        v-for="({ icon }, index) in sections",
        :key="icon",
        :class="index === currentTab ? $style.selectedTab : $style.tab"
        @click="$emit('goToTab', index)"
      ).flex-grow-1
        v-btn(icon, :class="$style.tabButton")
          v-icon(:color="index === currentTab ? 'primary' : ''") {{ icon }}
    v-tabs(height="0", :value="currentTab")
      v-tab-item(v-for="index in sections.length", :key="index")
        component(
          :is="sections[index - 1].component",
          v-bind="completeCharacter",
          @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)",
          @goToStep="step => $emit('goToStep', step)"
          @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
          @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)",
          @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
        ).text-left
</template>

<style module lang="scss">
  @import "src/assets/styles/colors.scss";

  .tab:hover {
    background-color: rgba($black, .04)
  }

  .selectedTab {
    border-bottom: 2px solid $primary;

    &:hover {
      background-color: rgba($primary, .12);
    }
  }

  .tabButton::before {
    color: transparent !important;
  }
</style>
