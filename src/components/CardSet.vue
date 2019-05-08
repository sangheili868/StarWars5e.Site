<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CardSet extends Vue {
    @Prop(Array) readonly cards!: any[]
  }
</script>

<template lang="pug">
    v-container(grid-list-lg, fluid)
      v-layout(row, wrap, justify-center)
        v-flex(v-for="(card, index) in cards", :key="card.name", d-flex).xs12.sm6.md4
          v-card(:to="card.to", hover, exact)
            slot(:card="card")
</template>
