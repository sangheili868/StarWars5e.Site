<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class MyDialog extends Vue {
    @Prop(Boolean) readonly value!: Boolean
    @Prop(Boolean) readonly disabled!: Boolean
    @Prop(Boolean) readonly wide!: Boolean
    @Prop(Function) readonly onClose!: Function

    get isDark () {
      return this.$vuetify.theme.dark
    }

    get hasTitle () {
      return !!this.$slots.title || !!this.$scopedSlots.title
    }

    get onCloseFunction () {
      if (this.onClose) {
        return this.onClose
      }
      return () => {}
    }
  }
</script>

<template lang="pug">
  v-dialog(v-bind="{ value, disabled }", :width="wide ? 1000 : 500", scrollable, @click:outside="onCloseFunction", @input="input => $emit('input', input)")
    template(v-slot:activator="{ on }")
      slot(name="activator", :on="on")
    v-card(:class="[ $style.modal, { [$style.darkSide]: isDark } ]")
      v-card-title(
        v-if="hasTitle"
        primary-title,
        :class="{ ['darken-1']: isDark, ['lighten-2']: !isDark }"
      ).primary--text.text-h5.grey
        slot(name="title")
      v-card-text
        slot(name="text")
      v-divider
      v-card-actions
        slot(name="actions")
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .modal {
    background: $backgroundGradient;

    &.darkSide {
      background: $darkSideGradient;
    }
  }
</style>
