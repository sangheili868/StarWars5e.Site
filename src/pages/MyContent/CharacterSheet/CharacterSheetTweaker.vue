
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { RawCharacterType, TweakPathType } from '@/types/rawCharacterTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import { get, set, parseInt as _parseInt, cloneDeep } from 'lodash'
  import vueSetPath from '@/utilities/vueSetPath'
  import { namespace } from 'vuex-class'

  const characterModule = namespace('character')

  @Component({
    components: {
      MyDialog
    }
  })
  export default class CharacterSheetTweaker extends Vue {
    @Prop(Array) readonly tweakPaths!: TweakPathType[]
    @Prop(String) readonly title!: string
    @Prop({ default: 'tweaks', type: String }) readonly rootPath!: string
    @Prop(Boolean) readonly noStyle!: boolean

    @characterModule.State character!: RawCharacterType

    isOpen = false
    myGet = get
    myTweaks = {}

    get diceSizes () {
      return [4, 6, 8, 10, 12].map(value => ({ text: 'd' + value, value }))
    }

    resetValues () {
      this.myTweaks = cloneDeep(get(this.character, this.rootPath) || {})
    }

    sanitize (value: string) {
      const sanitizedValue: number | null = _parseInt(value)
      return isNaN(sanitizedValue) ? null : sanitizedValue
    }

    updateTweak (newValue: string, tweakType: string, path: string) {
      vueSetPath(this.myTweaks, `${path}.${tweakType}`, this.sanitize(newValue))

      if (tweakType !== 'dieSize') {
        const otherTweakType = tweakType === 'override' ? 'bonus' : 'override'
        vueSetPath(this.myTweaks, `${path}.${otherTweakType}`, null)
      }
    }

    updateProficiency (newValue: string | null, path: string) {
      vueSetPath(this.myTweaks, `${path}.proficiency`, newValue)
    }

    handleSave () {
      this.$emit('replaceCharacterProperty', { path: this.rootPath, property: this.myTweaks })
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
      div(v-for="({ name, path, type, rootPath }) in tweakPaths", :key="path").d-flex.align-center
        h5(:class="$style.label") {{ name }}
        v-select(
          v-if="type === 'dice'",
          :value="myGet(myTweaks, path + '.dieSize')"
          outlined,
          :items="diceSizes",
          hide-details,
          clearable,
          label="Dice Size",
          @input="newValue => updateTweak(newValue, 'dieSize', path, rootPath)"
        ).pa-1
        div(v-else)
          div.d-flex
            v-text-field(
              :value="myGet(myTweaks, path + '.bonus')"
              outlined,
              type="number",
              hide-details,
              clearable,
              label="Bonus",
              @input="newValue => updateTweak(newValue, 'bonus', path)"
            ).pa-1
            v-text-field(
              :value="myGet(myTweaks, path + '.override')"
              outlined,
              type="number",
              hide-details,
              clearable,
              label="Override",
              @input="newValue => updateTweak(newValue, 'override', path)"
            ).pa-1
          div(v-if="type === 'proficiency'")
            v-select(
              :value="myGet(myTweaks, path + '.proficiency')",
              :items="[ 'Expertise', 'Proficient' ]",
              outlined,
              hide-details,
              clearable,
              label="Proficiency Level",
              @input="newValue => updateProficiency(newValue, path)"
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

  .label {
    min-width: 130px;
  }
</style>
