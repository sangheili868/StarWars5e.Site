<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ConditionType } from '@/types/lookupTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import VueMarkdown from 'vue-markdown'
  import { range } from 'lodash'
  import MySelect from '@/components/MySelect.vue'

  const conditionsModule = namespace('conditions')

  @Component({
    components: {
      MyDialog,
      VueMarkdown,
      MySelect
    }
  })
  export default class CharacterSheetConditions extends Vue {
    @Prop(Array) readonly myConditions!: ConditionType[]
    @Prop(Number) readonly exhaustion!: number
    @conditionsModule.State conditions!: ConditionType[]
    @conditionsModule.Action fetchConditions!: () => void

    isOpen = false
    range = range

    created () {
      this.fetchConditions()
    }

    get items () {
      return this.conditions.map(({ name }) => name)
    }

    get hasExhaustion () {
      return this.myConditions.some(({ name }) => name === 'Exhaustion')
    }

    updateConditions (newConditions: string[]) {
      if (newConditions.includes('Exhaustion') && !this.exhaustion) this.updateExhaustion(1)
      if (!newConditions.includes('Exhaustion')) this.updateExhaustion(0)
      this.$emit('replaceCharacterProperty', { path: 'currentStats.conditions', property: newConditions })
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
        v-btn(v-on="on", block, :color="myConditions.length ? 'primary' : ''").mb-2 Conditions ({{ myConditions.length }})
      template(#title) Active Conditions
      template(#text)
        MySelect(
          :value="myConditions.map(({ name }) => name)",
          v-bind="{ items }",
          placeholder="Choose a condition",
          multiple,
          clearable,
          @change="updateConditions"
        )
        div(v-for="({ name, description }) in myConditions", :key="name")
          h3 {{ name }}
          VueMarkdown(:source="description")
      template(#actions)
        v-spacer
        v-btn(color="primary", text, @click="isOpen=false") Close
    div(v-if="hasExhaustion").d-flex.align-center.justify-space-around
      h4.pa-2 Levels of Exhaustion:
      MySelect(
        :class="$style.exhaustion",
        :value="exhaustion",
        :items="range(0,6)",
        hide-details,
        :change="updateExhaustion"
      ).px-2.pb-2.mt-0
</template>

<style module lang="scss">
  .exhaustion {
    max-width: 60px !important;
  }
</style>
