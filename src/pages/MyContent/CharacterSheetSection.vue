<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterSheetSection extends Vue {

  }
</script>

<template lang="pug">
  v-card(:class="$style.section").px-3.py-1.my-3
    slot
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .section {
    max-width: 350px;
    border-radius: 5px;
  }
</style>
