<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ConditionType } from '@/types/completeCharacterTypes'
  import { conditions as gdConditions } from '@/test/gameData.json'
  import MyDialog from '@/components/MyDialog.vue'
  import VueMarkdown from 'vue-markdown'
  import { range } from 'lodash'

  @Component({
    components: ({
      MyDialog,
      VueMarkdown
    })
  })
  export default class CharacterSheetConditions extends Vue {
    @Prop(Array) readonly conditions!: ConditionType[]
    @Prop(Number) readonly exhaustion!: number

    isOpen = false
    range = range

    get items () {
      return Object.keys(gdConditions)
    }

    get hasExhaustion () {
      return this.conditions.some(({ name }) => name === 'Exhaustion')
    }

    updateConditions (newConditions: string[]) {
      if (newConditions.includes('Exhaustion') && !this.exhaustion) this.updateExhaustion(1)
      if (!newConditions.includes('Exhaustion')) this.updateExhaustion(0)
      this.$emit('replaceCharacterList', 'currentStats.conditions', newConditions)
    }

    updateExhaustion (newExhaustion: number) {
      this.$emit('updateCharacter', { currentStats: { exhaustion: newExhaustion } })
    }
  }
</script>

<template lang="pug">
  div
    MyDialog(v-model="isOpen")
      template(v-slot:activator="{ on }")
        v-btn(v-on="on", :color="conditions.length ? 'primary' : ''").mb-2 Conditions ({{ conditions.length }})
      template(#title) Active Conditions
      template(#text)
        v-autocomplete(
          :value="conditions.map(({ name }) => name)",
          v-bind="{ items }",
          placeholder="Choose a condition",
          multiple,
          clearable,
          @change="updateConditions"
        )
        div(v-for="({ name, description }) in conditions", :key="name")
          h3 {{ name }}
          VueMarkdown(:source="description")
      template(#actions)
        v-spacer
        v-btn(color="primary", text, @click="isOpen=false") Close
    div(v-if="hasExhaustion").d-flex.align-center.justify-space-around
      h4.pa-2 Levels of Exhaustion:
      v-autocomplete(
        :class="$style.exhaustion",
        :value="exhaustion",
        :items="range(0,6)",
        :change="updateExhaustion"
      ).pr-2
</template>

<style module lang="scss">
  .exhaustion {
    max-width: 60px !important;
  }
</style>
