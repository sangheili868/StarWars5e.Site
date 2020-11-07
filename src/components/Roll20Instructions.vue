<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class Roll20Instructions extends Vue { }
</script>

<template lang="pug">
  div
      h2.mt-3 Instructions
      div.caption You must be the GM of the campaign to import a character
      ol
        li Ensure that the Roll 20 Campaign is using the
          u.pl-1
            a(href="https://wiki.roll20.net/StarWars5E-Sheet", target="_blank") SW5E character sheet
        li Install #[strong Firefox] and the
          u.pl-1
            a(href="https://addons.mozilla.org/en-US/firefox/addon/roll20-enhancement-suite/", target="_blank") VTT Enhancement Suite
        li Click #[span.primary--text Save File] below to download the character File
        li Go to the Roll 20 campaign and open the journal tab
        li At the top of the journal tab, under "Import Character", click "Browse"
        li Open the file you downloaded from this pop-up
        li Click the "Import Character" button that appears once the file is opened
</template>
