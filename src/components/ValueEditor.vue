<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'

  @Component({
    components: {
      MyDialog
    }
  })
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
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on", @click="resetValues").d-flex.align-center.my-2
        slot
          div {{ label }}: {{ value }}
    template(#title) Adjust {{ label }}
    template(#text)
      div Current: {{ value }} {{ label }}
      div.d-flex.align-center
        v-autocomplete(:items="['Add', 'Subtract', 'Set']", v-model="modifierType")
        v-text-field(outlined, autofocus, type="number", hide-details v-model.number="modifierAmount", background-color="white").mx-1
        div {{ label }}
      slot(name="result", :newValue="newValue")
        div Result: {{ newValue }} {{ label }}
    template(#actions)
        v-btn(color="primary", @click="applyChanges") Apply
        v-spacer
        v-btn(color="primary", text, @click="isOpen=false") Close
</template>
