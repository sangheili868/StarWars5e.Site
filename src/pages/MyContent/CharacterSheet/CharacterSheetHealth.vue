<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { HitPointsType } from '@/types'
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
  div(:class="$style.outerDiv").mx-3.my-1
    div(:class="$style.controlDiv").d-flex.mx-4
      v-progress-circular(
        :value="100 * hitPoints.current / hitPoints.maximum",
        color="red",
        size="90",
        rotate="270"
        width="10"
      )
        h2 {{ hitPoints.current }}
        v-divider(width="71", :class="$style.divider")
        h2 {{ hitPoints.maximum }}
      v-dialog(v-model="isRestOpen", width="500")
        template(v-slot:activator="{ on }")
          v-btn(small, v-on="on", color="secondary") Rest
        CharacterSheetRest(v-bind="{ hitPoints }")
    div(:class="$style.controlDiv").d-flex.mr-4
      v-btn(color="green accent-3", small, @click="resetHealthMod").white--text Heal
      v-text-field(outline, single-line, hide-details, type="number", v-model="healthMod")
      v-btn(color="red accent-3", small, @click="resetHealthMod").white--text Damage
</template>

<style module lang="scss">
  .outerDiv {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .controlDiv {
      max-width: 100px;
      flex-direction: column;
      align-items: center;

      .divider {
        visibility: visible;
      }
    }
  }
</style>
