<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class MyDialog extends Vue {
    @Prop(Boolean) readonly value!: Boolean

    get isDark () {
      return this.$vuetify.theme.dark
    }
  }
</script>

<template lang="pug">
  v-dialog(:value="value", width="500" @input="input => $emit('input', input)")
    template(v-slot:activator="{ on }")
      slot(name="activator", :on="on")
    v-card(:class="[ $style.modal, { [$style.darkSide]: isDark } ]")
      v-card-title(
        v-if="$slots.title"
        primary-title,
        :class="{ ['darken-1']: isDark, ['lighten-2']: !isDark }"
      ).primary--text.headline.grey
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
