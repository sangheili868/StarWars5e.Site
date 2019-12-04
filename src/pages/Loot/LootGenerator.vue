<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import VueFriendlyIframe from 'vue-friendly-iframe'
  import BackButton from '@/components/BackButton.vue'

  @Component({
    components: {
      VueFriendlyIframe,
      BackButton
    }
  })

  export default class LootGenerator extends Vue {}

</script>

<template lang="pug">
  div
    BackButton
    h1 Loot Generator
    VueFriendlyIframe(src="https://perchance.org/dc9k0z3gop", :className="$style.iframeContainer", frameborder="0")
</template>

<style module lang="scss">
  .iframeContainer {
    width: 100%;
    min-height: 700px;
  }
</style>
