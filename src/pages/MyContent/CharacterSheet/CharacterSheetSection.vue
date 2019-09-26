<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CharacterSheetAbilities from './CharacterSheetAbilities.vue'
  import CharacterSheetCombat from './CharacterSheetCombat.vue'
  import CharacterSheetCasting from './CharacterSheetCasting.vue'
  import CharacterSheetEquipment from './CharacterSheetEquipment.vue'
  import CharacterSheetDescription from './CharacterSheetDescription.vue'
  import CharacterSheetProficiencies from './CharacterSheetProficiencies.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'

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
    @Prop(Number) readonly currentTab!: number

    get sections () {
      const hasPowers = this.completeCharacter.techCasting || this.completeCharacter.forceCasting
      return [
        {
          component: 'CharacterSheetAbilities',
          icon: 'fa-dice-d20'
        },
        {
          component: 'CharacterSheetCombat',
          icon: 'fa-fist-raised'
        }
      ].concat(hasPowers ? [ {
        component: 'CharacterSheetCasting',
        icon: 'fa-bolt'
      }] : []).concat([
        {
          component: 'CharacterSheetEquipment',
          icon: 'fa-tools'
        },
        {
          component: 'CharacterSheetProficiencies',
          icon: 'fa-globe'
        },
        {
          component: 'CharacterSheetDescription',
          icon: 'fa-briefcase'
        }
      ])
    }
  }
</script>

<template lang="pug">
  v-card.px-3
    v-tabs(fixed-tabs, center-active, :value="currentTab")
      v-tab(v-for="({ icon }) in sections", :key="icon")
        v-icon {{ icon }}
      v-tab-item(v-for="({ component }) in sections", :key="component")
        component(:is="component", v-bind="completeCharacter").text-left
</template>
