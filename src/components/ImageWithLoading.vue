<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import Loading from '@/components/Loading.vue'

  @Component({
    components: {
      Loading
    }
  })
  export default class ImageWithLoading extends Vue {
    isError = false

    @Watch('$route')
    resetError () {
      this.isError = false
    }

    handleError () {
      this.isError = true
    }
  }
</script>

<template lang="pug">
  span(v-if="$attrs.src")
    v-img(v-show="!isError", v-bind="$attrs", @error="handleError").ma-auto
      template(v-slot:placeholder)
        div.d-flex.justify-center.align-center.fill-height
          Loading
    v-alert(
      v-if="isError",
      color="primary",
      type="error",
      elevation="2",
      colored-border,
      border="left"
    )
      | Error loading image! Please report this to the #[span.primary--text #website-bug-reports] channel in the SW5e Discord server.
</template>
