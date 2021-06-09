<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class FoundryVTTInstructions extends Vue { }
</script>

<template lang="pug">
  div.mt-5
    ol
      li Ensure that your Foundry VTT campaign is using the
        u.pl-1
          a(href="https://github.com/unrealkakeman89/sw5e", target="_blank") SW5e Game System
      li Click #[span.primary--text Copy File] below to copy the character to the clipboard
      li Go to the Actors tab in Foundry VTT and click #[strong Import Character]
      li Paste the character into the text box and press #[strong Import Character]
</template>
