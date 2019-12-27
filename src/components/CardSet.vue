<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CardSet extends Vue {
    @Prop(Array) readonly cards!: any[]
  }
</script>

<template lang="pug">
    v-container(fluid)
      v-row(justify="center")
        v-col(v-for="(card, index) in cards", :key="card.name", :cols="12", :sm="6", :md="4", :lg="3")
          v-card(:to="card.to", hover, exact, height="100%")
            slot(:card="card")
</template>
