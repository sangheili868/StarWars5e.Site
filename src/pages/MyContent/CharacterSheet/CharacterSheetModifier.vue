<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { TweaksType } from '@/types/rawCharacterTypes'
  import addPlus from '@/utilities/addPlus'
  import MyDialog from '@/components/MyDialog.vue'
  import { get, isFinite, parseInt as _parseInt } from 'lodash'

  @Component({
    components: {
      MyDialog
    }
  })
  export default class CharacterSheetModifier extends Vue {
    @Prop([Number, String]) readonly modifier!: number | string
    @Prop([Number, String]) readonly value!: number | string
    @Prop(String) readonly label!: string
    @Prop(Boolean) readonly big!: boolean
    @Prop(Boolean) readonly noStyles!: boolean
    @Prop(String) readonly tweakPath!: string
    @Prop(Object) readonly tweaks!: TweaksType

    isOpen = false
    get = get
    bonus: number | null = null
    override: number | null = null

    get valueToShow () {
      return isFinite(Number(this.modifier)) ? addPlus(Number(this.modifier)) : this.value
    }

    get hasValueAndModifier () {
      return isFinite(this.modifier) && isFinite(this.value)
    }

    get valueComponent () {
      if (this.big) return 'h2'
      else if (this.noStyles) return 'div'
      else return 'h5'
    }

    get labelComponent () {
      if (this.big) return 'h3'
      else if (this.noStyles) return 'div'
      else return 'h4'
    }

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
        span(
          :class="{ [$style.button]: tweakPath, [$style.hovered]: hover && tweakPath }",
          v-on="on",
          @click="resetValues"
        ).d-flex.px-1.align-end
          component(:is="valueComponent", :class="{ [$style.values]: !noStyles }").mr-1.text-center {{ valueToShow }}
          component(:is="labelComponent").text-left.flex-grow-1 {{ label }}
      div(v-if="hasValueAndModifier").d-flex
        h5(:class="$style.values").mr-3.text-center {{ value }}
        slot
    template(#title) Tweak {{ label }}
    template(#text)
      div.mt-3 Current Value (including tweaks): {{ valueToShow }}
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

  .values {
    min-width: 20px;
    font-family: 'Russo One', sans-serif;
  }
</style>
