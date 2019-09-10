<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CastingType } from '@/types'
  import CharacterSheetModifier from './CharacterSheetModifier.vue'
  import CharacterSheetCastingPower from './CharacterSheetCastingPower.vue'
  import { groupBy } from 'lodash'
  import CharacterSheetTicker from './CharacterSheetTicker.vue'

  @Component({
    components: {
      CharacterSheetModifier,
      CharacterSheetCastingPower,
      CharacterSheetTicker
    }
  })
  export default class CharacterSheetCasting extends Vue {
    @Prop(Object) readonly techCasting!: CastingType
    @Prop(Object) readonly forceCasting!: CastingType
    groupBy = groupBy

    techLevelText (level: number) {
      return level > 0 ? `Level ${level}` : 'At-will'
    }
  }
</script>

<template lang="pug">
  div
    h3 Tech Casting
    CharacterSheetTicker(:current="techCasting.currentPoints", :max="techCasting.maxPoints") Tech Points
    CharacterSheetModifier(:modifier="techCasting.attackModifier", label="Tech Attack Modifier", small)
    CharacterSheetModifier(:modifier="techCasting.saveDC", label="Tech Save DC", isFlatNumber, small)
    div(v-for="(powers, level) in groupBy(techCasting.powersKnown, 'level')", :key="level")
      h3.mt-2 {{ techLevelText(level) }}
      v-expansion-panel
        CharacterSheetCastingPower(
          v-for="power in powers"
          :key="power.name"
          v-bind="{ power }"
        )
</template>
