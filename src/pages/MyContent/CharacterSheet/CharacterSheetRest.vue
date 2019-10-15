<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { HitPointsType } from '@/types/completeCharacterTypes'
  import CheckList from '@/components/CheckList.vue'
  import MyDialog from '@/components/MyDialog.vue'
  import { chain, mapValues } from 'lodash'

  @Component({
    components: {
      CheckList,
      MyDialog
    }
  })
  export default class CharacterSheetRest extends Vue {
    @Prop(Object) readonly hitPoints!: HitPointsType

    hitDiceToUse: { [ key: string ]: number} = {}
    isRestOpen = false
    dieResult = 0
    mode = 'Short Rest'

    get numHitDiceToUse () {
      return Object.values(this.hitDiceToUse).reduce((sum, count) => sum + count, 0)
    }

    get conHealing () {
      return this.numHitDiceToUse * this.hitPoints.resting.hitDieBonus
    }

    get totalHealing () {
      return this.conHealing + this.dieResult
    }

    resetCount () {
      this.mode = 'Short Rest'
      this.dieResult = 0
      this.hitDiceToUse = chain(this.hitPoints.hitDice)
        .keyBy('size')
        .mapValues(() => 0)
        .value()
    }

    setCount (size: string, numSelected: number) {
      Vue.set(this.hitDiceToUse, size, numSelected)
      if (this.numHitDiceToUse === 0) this.dieResult = 0
    }

    takeRest () {
      if (this.mode === 'Short Rest') this.takeShortRest()
      else this.takeLongRest()
      this.isRestOpen = false
    }

    takeShortRest () {
      const featuresTimesUsed = chain(this.hitPoints.resting.shortRestFeatures)
        .map(i => ({ key: i, val: 0 }))
        .keyBy('key')
        .mapValues('val')
        .value()
      this.$emit('updateCharacter', { currentStats: {
        hitPoints: Math.min(this.hitPoints.maximum, this.hitPoints.current + this.totalHealing),
        techPoints: this.hitPoints.resting.maxTechPoints,
        superiorityDice: this.hitPoints.resting.maxSuperiorityDice,
        hitDiceUsed: mapValues(this.hitDiceToUse, (numSpent, spentSize) => {
          const dice = this.hitPoints.hitDice.find(({ size }) => size === spentSize)
          return dice ? dice.maximum - dice.current + numSpent : 0
        }),
        featuresTimesUsed
      } })
    }

    takeLongRest () {
      const featuresTimesUsed = chain(this.hitPoints.resting.longRestFeatures)
        .map(i => ({ key: i, val: 0 }))
        .keyBy('key')
        .mapValues('val')
        .value()
      const hitDiceUsed = chain(this.hitPoints.hitDice).map(({ size, current, maximum }) => {
        const restored = this.hitPoints.resting.hitDiceRestored.find(restored => restored.size === size)
        return { size, used: maximum - current - (restored ? restored.numRestored : 0) }
      }).keyBy('size').mapValues('used').value()
      this.$emit('updateCharacter', { currentStats: {
        hitPoints: this.hitPoints.maximum,
        temporaryHitPoints: 0,
        techPoints: this.hitPoints.resting.maxTechPoints,
        forcePoints: this.hitPoints.resting.maxForcePoints,
        superiorityDice: this.hitPoints.resting.maxSuperiorityDice,
        hitDiceUsed,
        featuresTimesUsed
      } })
    }
  }
</script>

<template lang="pug">
div
  MyDialog(v-model="isRestOpen", @input="resetCount")
    template(v-slot:activator="{ on }")
      v-btn(small, v-on="on", color="secondary").ma-2 Rest
    template(#title) Rest
    template(#text, v-if="isRestOpen")
      div.d-flex.align-center
        div.pr-2 Take a
        v-autocomplete(v-model="mode", :items="['Short Rest', 'Long Rest']")
      div(v-if="mode === 'Short Rest'")
        div(v-if="hitPoints.resting.shortRestFeatures.length")
          div The following features will have their uses restored:
          ul
            li(v-for="feature in hitPoints.resting.shortRestFeatures", :key="feature") {{ feature }}
        div Select the number of hit dice you are using, if any:
        CheckList(
          v-for="{ size, current, maximum} in hitPoints.hitDice",
          :key="size",
          :current="hitDiceToUse[size]",
          v-bind="{ maximum }",
          :blocked="maximum - current",
          :title="size + 's'",
          @changeSelected="numSelected => setCount(size, numSelected)"
        ).ma-2
        div Enter the total result rolled on those dice:
        v-text-field(
          outlined,
          single-line,
          hide-details,
          :disabled="numHitDiceToUse === 0"
          type="number",
          v-model.number="dieResult"
        ).my-2
        div Your constitution will heal you an additional {{ conHealing }} hit {{ conHealing === 1 ? 'point' : 'points' }}.
        div In total, you will regain {{ totalHealing }} hit {{ totalHealing === 1 ? 'point' : 'points' }}.
      div(v-else)
        div(v-if="hitPoints.resting.longRestFeatures.length")
          div The following features will have their uses restored:
          ul
            li(v-for="feature in hitPoints.resting.longRestFeatures", :key="feature") {{ feature }}
        div(v-if="hitPoints.resting.numHitDiceUsed > 0")
          div You will regain the following hit dice:
          ul
            li(v-for="({ size, numRestored }) in hitPoints.resting.hitDiceRestored", :key="size") {{ numRestored }}{{ size }}
    template(#actions)
      v-btn(color="primary", @click="takeRest") Take a {{ mode }}
      v-spacer
      v-btn(color="primary", text, @click="isRestOpen=false") Close
</template>
