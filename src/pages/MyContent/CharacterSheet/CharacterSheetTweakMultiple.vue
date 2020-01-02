
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { TweaksType } from '@/types/rawCharacterTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import { get, set, parseInt as _parseInt } from 'lodash'

  @Component({
    components: {
      MyDialog
    }
  })
  export default class CharacterSheetTweakMultiple extends Vue {
    @Prop(Object) readonly tweaks!: TweaksType
    @Prop(Array) readonly tweakPaths!: { name: string, path: string, type?: 'dice' }[]
    @Prop(String) readonly title!: string
    @Prop(Boolean) readonly noStyle!: boolean

    isOpen = false
    get = get
    myTweaks: TweaksType = {}

    get diceSizes () {
      return [4, 6, 8, 10, 12].map(value => ({ text: 'd' + value, value }))
    }

    resetValues () {
      this.myTweaks = this.tweaks
    }

    sanitize (value: string) {
      const sanitizedValue: number | null = _parseInt(value)
      return isNaN(sanitizedValue) ? null : sanitizedValue
    }

    updateTweak (newValue: string, tweakType: string, path: string) {
      set(this.myTweaks, `${path}.${tweakType}`, this.sanitize(newValue))

      if (tweakType !== 'dieSize') {
        const otherTweakType = tweakType === 'override' ? 'bonus' : 'override'
        set(this.myTweaks, `${path}.${otherTweakType}`, null)
      }
    }

    handleSave () {
      this.$emit('replaceCharacterProperty', { path: 'tweaks', property: this.myTweaks })
      this.isOpen = false
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      div(:class="{ [$style.button]: !noStyle }", v-on="on", @click="resetValues").pa-1
        slot
    template(#title) Tweak {{ title }}
    template(#text)
      v-container
        v-row(v-for="({ name, path, type }) in tweakPaths", :key="path").d-flex
          v-col(cols="4").pa-0.d-flex.align-center
            h5 {{ name }}
          v-col(v-if="type === 'dice'", cols="8").pa-0
            v-select(
              :value="get(tweaks, path + '.dieSize')"
              outlined,
              :items="diceSizes",
              hide-details,
              clearable,
              label="Dice Size",
              @input="newValue => updateTweak(newValue, 'dieSize', path)"
            ).pa-1
          template(v-else)
            v-col(cols="4").pa-0
              v-text-field(
                :value="get(tweaks, path + '.bonus')"
                outlined,
                type="number",
                hide-details,
                clearable,
                label="Bonus",
                @input="newValue => updateTweak(newValue, 'bonus', path)"
              ).pa-1
            v-col(cols="4").pa-0
              v-text-field(
                :value="get(tweaks, path + '.override')"
                outlined,
                type="number",
                hide-details,
                clearable,
                label="Override",
                @input="newValue => updateTweak(newValue, 'override', path)"
              ).pa-1
    template(#actions)
      v-btn(color="primary", @click="handleSave") Save
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Cancel
</template>

<style module lang="scss">
  @import "src/assets/styles/colors.scss";

  .button {
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: $lightGrey;
    }
  }
</style>
