<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { TweaksType } from '@/types/rawCharacterTypes'

  @Component
  export default class CharacterSheetSettingsTweaks extends Vue {
    @Prop(Object) readonly tweaks!: TweaksType

    baseTweaks = [
      {
        name: 'Initiative Modifier',
        path: 'initiative'
      },
      {
        name: 'Proficiency Bonus',
        path: 'proficiencyBonus'
      },
      {
        name: 'Armor Class',
        path: 'armorClass'
      },
      {
        name: 'Weapons',
        subtweaks: [
          {
            name: 'To Hit',
            path: 'weapon.toHit'
          },
          {
            name: 'Damage Bonus',
            path: 'weapon.damage'
          }
        ]
      }
    ]

    get tweaksList () {
      return this.baseTweaks
    }
  }
</script>

<template lang="pug">
  div.pt-5
    h2 Tweak Numbers
    div {{ tweaks }}
    v-container
      v-row(v-for="({ name, path, subtweaks }) in tweaksList", :key="name")
        v-col(v-if="subtweaks", cols="12").pa-0
          h3 {{ name }}
          div(v-for="({ name: subname, path }) in subtweaks", :key="name + subname").d-flex
            v-col(cols="4").pa-0.d-flex.align-center
              h5 {{ subname }}
            v-col(cols="4").pa-0
              v-text-field(outlined, type="number", hide-details, clearable, label="Bonus").pa-1
            v-col(cols="4").pa-0
              v-text-field(outlined, type="number", hide-details, clearable, label="Override").pa-1
        template(v-else)
          v-col(cols="4").pa-0.d-flex.align-center
            h5 {{ name }}
          v-col(cols="4").pa-0
            v-text-field(outlined, type="number", hide-details, clearable, label="Bonus").pa-1
          v-col(cols="4").pa-0
            v-text-field(outlined, type="number", hide-details, clearable, label="Override").pa-1
</template>

<style module lang="scss">

</style>
