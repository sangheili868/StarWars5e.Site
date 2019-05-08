<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import Loading from '@/components/Loading.vue'

  @Component({
    inheritAttrs: false,
    components: {
      Loading
    }
  })
  export default class ImageWithLoading extends Vue {
    isLoaded = false

    @Watch('$route')
    resetLoading () {
      this.isLoaded = false
    }
  }
</script>

<template lang="pug">
  span
    v-img(v-bind="$attrs", v-show="isLoaded", @load="isLoaded=true")
    Loading(v-if="!isLoaded")
</template>
