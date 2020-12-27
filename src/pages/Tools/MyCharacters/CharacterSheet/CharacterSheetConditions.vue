<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ConditionType } from '@/types/lookupTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import VueMarkdown from 'vue-markdown'
  import { range } from 'lodash'
  import MySelect from '@/components/MySelect.vue'
  import CharacterSheetMenuButton from './CharacterSheetMenuButton.vue'

  const conditionsModule = namespace('conditions')

  @Component({
    components: {
      MyDialog,
      VueMarkdown,
      MySelect,
      CharacterSheetMenuButton
    }
  })
  export default class CharacterSheetConditions extends Vue {
    @Prop(Array) readonly myConditions!: ConditionType[]
    @Prop(Number) readonly exhaustion!: number
    @conditionsModule.State conditions!: ConditionType[]

    isOpen = false
    range = range

    updateConditions (newConditions: string[]) {
      let newExhaustion
      if (newConditions.includes('Exhaustion') && !this.exhaustion) newExhaustion = 1
      if (!newConditions.includes('Exhaustion')) newExhaustion = 0
      this.$emit('replaceCharacterProperties', [
        { path: 'currentStats.conditions', property: newConditions },
        { path: 'currentStats.exhausion', property: newExhaustion }
      ])
    }
  }
</script>

<template lang="pug">
  div
    MyDialog(v-model="isOpen")
      template(v-slot:activator="{ on }")
        CharacterSheetMenuButton(
          :text="'Conditions (' + myConditions.length + ')'",
          :icon="myConditions.length ? 'frown' : 'smile'"
          :color="myConditions.length ? 'primary' : ''"
          :on="on"
        )
      template(#title) Active Conditions
      template(#text)
        MySelect(
          :value="myConditions.map(({ name }) => name)",
          :items="conditions.map(({ name }) => name)",
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
    div(v-if="myConditions.some(({ name }) => name === 'Exhaustion')").d-flex.align-center.justify-space-around
      h4.pa-2 Levels of Exhaustion:
      MySelect(
        :class="$style.exhaustion",
        :value="exhaustion",
        :items="range(0,6)",
        hide-details,
        :change="newExhaustion => $emit('replaceCharacterProperties', [{ path: 'currentStats.exhaustion', property: newExhaustion }])"
      ).px-2.pb-2.mt-0
</template>

<style module lang="scss">
  .exhaustion {
    max-width: 60px !important;
  }
</style>
