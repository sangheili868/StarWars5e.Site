<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetAbilities from './CharacterSheetAbilities.vue'
  import CharacterSheetCombat from './CharacterSheetCombat.vue'
  import CharacterSheetCasting from './CharacterSheetCasting.vue'
  import CharacterSheetEquipment from './CharacterSheetEquipment.vue'
  import CharacterSheetDescription from './CharacterSheetDescription.vue'
  import CharacterSheetProficiencies from './CharacterSheetProficiencies.vue'
  import { CompleteCharacterType } from '@/types'

  @Component({
    components: {
      CharacterSheetAbilities,
      CharacterSheetCombat,
      CharacterSheetCasting,
      CharacterSheetEquipment,
      CharacterSheetDescription,
      CharacterSheetProficiencies
    }
  })
  export default class CharacterSheetSection extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType

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
          icon: 'fa-tools'
        },
        {
          component: 'CharacterSheetProficiencies',
          icon: 'fa-rocket'
        },
        {
          component: 'CharacterSheetDescription',
          icon: 'fa-briefcase'
        }
      ]
    }
  }
</script>

<template lang="pug">
  v-card(:class="$style.section").px-3.py-1.ma-2
    v-tabs
      v-tab(v-for="({ icon }) in sections", :key="icon")
        v-icon {{ icon }}
      v-tab-item(v-for="({ component }) in sections", :key="component")
        component(:is="component", v-bind="completeCharacter")
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .section {
    min-width: 300px;
    border-radius: 5px;
  }
</style>
