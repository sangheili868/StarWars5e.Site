<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ValueEditor extends Vue {
    @Prop(Number) readonly value!: number
    @Prop(String) readonly label!: string

    isOpen = false
    newValue = 0
  }
</script>

<template lang="pug">
  v-dialog(v-model="isOpen", width="500")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on", @click="newValue=value").d-flex.align-center.my-2
        slot
    v-card(:class="$style.modal")
      v-card-title(primary-title).primary--text.headline.grey.lighten-2 Adjust {{ label }}
      v-card-text
        v-container
          v-row
            v-col(cols="6")
              v-text-field(outlined, type="number", v-model.number="newValue", background-color="white")
      v-card-actions
        v-spacer
        v-btn(color="primary", text, @click="isOpen=false") Close

</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';
  .modal {
    background: $backgroundGradient;
  }
</style>
