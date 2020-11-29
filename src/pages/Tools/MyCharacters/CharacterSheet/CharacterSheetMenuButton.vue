<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterSheetMenuButton extends Vue {
    @Prop(String) readonly text!: string
    @Prop(String) readonly icon!: string
    @Prop(String) readonly color!: string
    @Prop(Object) readonly on!: any
  }
</script>

<template lang="pug">
  v-btn(text, :color="color", :class="$style.fullWidth", v-on="on").pa-3
    div.flex-grow-1.text-left
      v-icon.mr-3 fa-{{ icon }}
      | {{ text }}
</template>

<style module lang="scss">
  .fullWidth {
    width: 100%;
  }
</style>
