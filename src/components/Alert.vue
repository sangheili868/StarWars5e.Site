<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class Alert extends Vue {
    @Prop(Boolean) readonly value!: boolean
  }
</script>

<template lang="pug">
  v-banner(
    :value="value",
    sticky,
    color="white",
    icon-color="red",
    :icon="$vuetify.breakpoint.name === 'xs' ? '' : 'fa-exclamation'",
    mobile-break-point="600",
    :class="$style.banner"
  ).white--text.mb-3
    slot
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .banner {
    z-index: 4 !important;
    background-color: #f44336 !important;
    border-radius: 10px !important;
  }
</style>

<style lang="scss">
  .v-banner.v-banner--is-mobile .v-banner__wrapper {
    padding: 5px;
  }

  .v-banner__text {
    flex-grow: 1;
  }
</style>
