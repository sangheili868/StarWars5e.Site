<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { HitPointsType } from '@/types/completeCharacterTypes'
  import CharacterSheetRest from './CharacterSheetRest.vue'

  @Component({
    components: {
      CharacterSheetRest
    }
  })
  export default class CharacterSheetHealth extends Vue {
    @Prop(Object) readonly hitPoints!: HitPointsType

    healthMod = 0
    isRestOpen = false

    resetHealthMod () {
      this.healthMod = 0
    }
  }
</script>

<template lang="pug">
  div.d-flex.align-center.mx-3.my-1
    div(:class="$style.controlDiv").d-flex.flex-column.align-center.mx-4
      v-progress-circular(
        :value="100 * hitPoints.current / hitPoints.maximum",
        color="red",
        size="90",
        rotate="270"
        width="10"
      )
        div
          h2 {{ hitPoints.current }}
          v-divider(width="71", :class="$style.divider")
          h2 {{ hitPoints.maximum }}
      v-dialog(v-model="isRestOpen", width="500")
        template(v-slot:activator="{ on }")
          v-btn(small, v-on="on", color="secondary").ma-2 Rest
        CharacterSheetRest(v-bind="{ hitPoints }", @close="isRestOpen=false")
    div(:class="$style.controlDiv").d-flex.flex-column.align-center.mr-4
      v-btn(color="green accent-3", small, @click="resetHealthMod").white--text Heal
      v-text-field(outlined, single-line, hide-details, type="number", v-model="healthMod").my-2
      v-btn(color="red accent-3", small, @click="resetHealthMod").white--text Damage
</template>

<style module lang="scss">
  .controlDiv {
    max-width: 100px;
  }

  .divider {
    visibility: visible;
  }
</style>
