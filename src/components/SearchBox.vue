<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  @Component
  export default class SearchBox extends Vue {
    @Prop({ type: Boolean, default: false }) readonly isClearable!: boolean

    searchText = ''

    created () {
      this.setText()
    }

    @Watch('$route')
    setText () {
      this.searchText = this.$route.query.searchText as string
    }

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
    :clearable="isClearable",
    hide-details,
    autofocus,
    @click:append="handleSubmit"
    @keypress="handleInput"
  ).searchInput.ml-2
</template>

<style lang="scss">
  .searchInput.v-text-field--solo {
    align-self: center;
  }
</style>
