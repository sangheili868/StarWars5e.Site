<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class SearchBox extends Vue {
    searchText = ''

    handleSubmit () {
      if (this.searchText) this.$router.push({ path: '/searchResults', query: { searchText: this.searchText } })
    }

    handleInput ({ code }: any) {
      if (code === 'Enter') this.handleSubmit()
    }
  }
</script>

<template lang="pug">
  v-text-field(
    label="Search",
    v-model="searchText",
    append-icon="fa-search",
    solo,
    clearable,
    @click:append="handleSubmit"
    @keypress="handleInput"
  ).searchInput
</template>

<style lang="scss">
  .searchInput.v-text-field--solo {
    align-self: center;

    .v-input__control .v-input__slot {
      border-radius: 100px !important;
      margin-bottom: 0;
    }
  }
</style>
