
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { TweaksType } from '@/types/rawCharacterTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import { get, parseInt as _parseInt } from 'lodash'

  @Component({
    components: {
      MyDialog
    }
  })
  export default class CharacterSheetTweaker extends Vue {
    @Prop(Number) readonly value!: number
    @Prop(Object) readonly tweaks!: TweaksType
    @Prop(String) readonly tweakPath!: string
    @Prop(String) readonly title!: string

    isOpen = false
    bonus: number | null = null
    override: number | null = null

    resetValues () {
      this.bonus = get(this.tweaks, this.tweakPath + '.bonus')
      this.override = get(this.tweaks, this.tweakPath + '.override')
    }

    sanitize (value: string) {
      const sanitizedValue: number | null = _parseInt(value)
      return isNaN(sanitizedValue) ? null : sanitizedValue
    }

    setBonus (bonus: string) {
      this.bonus = this.sanitize(bonus)
      this.override = null
    }

    setOverride (override: string) {
      this.override = this.sanitize(override)
      this.bonus = null
    }

    updateTweak () {
      this.$emit('replaceCharacterProperty', {
        path: 'tweaks.' + this.tweakPath,
        property: {
          bonus: this.bonus,
          override: this.override
        }
      })
      this.isOpen = false
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen", :disabled="!tweakPath")
    template(v-slot:activator="{ on }")
      v-hover(v-slot:default="{ hover }")
        div(:class="[$style.button, { [$style.hovered]: hover }]", v-on="on", @click="resetValues").pa-1
          slot
    template(#title) Tweak {{ title }}
    template(#text)
      div.mt-3 Current Value (including tweaks): {{ value }}
      div.d-flex.mt-1
        v-text-field(
          :value="bonus"
          outlined,
          type="number",
          hide-details,
          clearable,
          label="Bonus",
          @input="setBonus"
        ).pa-1
        v-text-field(
          :value="override"
          outlined,
          type="number",
          hide-details,
          clearable,
          label="Override",
          @input="setOverride"
        ).pa-1
    template(#actions)
      v-btn(color="primary", @click="updateTweak") Save
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Cancel
</template>

<style module lang="scss">
  @import "src/assets/styles/colors.scss";

  .button {
    cursor: pointer;
    border-radius: 5px;

    &.hovered {
      background-color: $lightGrey;
    }
  }
</style>
