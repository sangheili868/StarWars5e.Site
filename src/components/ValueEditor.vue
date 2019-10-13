<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ValueEditor extends Vue {
    @Prop(Number) readonly value!: number
    @Prop(String) readonly label!: string

    isOpen = false
    modifierAmount = 0
    modifierType = 'Add'

    get newValue () {
      return {
        Add: this.value + this.modifierAmount,
        Subtract: Math.max(0, this.value - this.modifierAmount),
        Set: Math.max(0, this.modifierAmount)
      }[this.modifierType as 'Add' | 'Subtract' | 'Set']
    }

    resetValues () {
      this.modifierAmount = 0
      this.modifierType = 'Add'
    }

    applyChanges () {
      this.isOpen = false
      this.$emit('input', this.newValue)
    }
  }
</script>

<template lang="pug">
  v-dialog(v-model="isOpen", width="500")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on", @click="resetValues").d-flex.align-center.my-2
        slot
          div {{ label }}: {{ value }}
    v-card(:class="$style.modal")
      v-card-title(primary-title).primary--text.headline.grey.lighten-2 Adjust {{ label }}
      v-card-text
        div Current: {{ value }} {{ label }}
        div.d-flex.align-center
          v-autocomplete(:items="['Add', 'Subtract', 'Set']", v-model="modifierType")
          v-text-field(outlined, autofocus, type="number", hide-details v-model.number="modifierAmount", background-color="white").mx-1
          div {{ label }}
        slot(name="result", :newValue="newValue")
          div Result: {{ newValue }} {{ label }}
      v-card-actions
        v-btn(color="primary", @click="applyChanges") Apply
        v-spacer
        v-btn(color="primary", text, @click="isOpen=false") Close
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';
  .modal {
    background: $backgroundGradient;
  }
</style>
