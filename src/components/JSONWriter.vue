<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { saveAs } from 'file-saver'
  import { isEmpty } from 'lodash'
  import MyDialog from '@/components/MyDialog.vue'
  import copy from 'copy-to-clipboard'
  import { RawCharacterType } from '@/types/rawCharacterTypes'

  const characterModule = namespace('character')

  @Component({
    components: {
      MyDialog
    }
  })
  export default class JSONWriter extends Vue {
    @Prop(Object) readonly jsonData!: object
    @Prop(String) readonly filename!: string
    @Prop(Boolean) readonly disabled!: boolean
    @characterModule.Action addCharacter!: (character: RawCharacterType) => void

    isOpen = false
    hasCopied = false

    saveToFile () {
      saveAs(new Blob([JSON.stringify(this.jsonData)], { type: 'text/plain;charset=utf-8;' }), this.filename + '.json')
      setTimeout(() => this.$emit('save'), 1000)
    }

    async saveToAccount () {
      await this.addCharacter(this.jsonData as RawCharacterType)
    }

    copyCharacter () {
      copy(JSON.stringify(this.jsonData))
      this.hasCopied = true
      this.$emit('save')
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(v-bind="{ disabled }", v-on="on", @click="hasCopied=false")
        slot
    template(#title) Save Character
    template(#text)
      div.
        You can save your character to a file, or copy it to paste somewhere. When you want to view your character again,
        you can upload the file or paste the text that you had copied
      div.d-flex.align-center.justify-space-around.flex-wrap
        v-btn(color="primary", @click="saveToFile").mt-3 Save Character File
        v-btn(color="primary", @click="copyCharacter").mt-3 Copy Character Text
        v-btn(color="primary", @click="saveToAccount").mt-3 Save To Account
        div(v-if="hasCopied") Copied Successfully
          v-icon(color="green").ml-3 fa-check
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>

<style lang="scss" module>
  .copyText {
    max-height: 300px;
  }
</style>
