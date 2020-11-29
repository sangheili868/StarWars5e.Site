<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import CharacterSheetExportToRoll20 from './CharacterSheetExportToRoll20.vue'
  import CharacterSheetMenuButton from './CharacterSheetMenuButton.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import copy from 'copy-to-clipboard'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { camelCase } from 'lodash'
  import { saveAs } from 'file-saver'

  @Component({
    components: {
      MyDialog,
      ConfirmDelete,
      CharacterSheetExportToRoll20,
      CharacterSheetMenuButton
    }
  })
  export default class CharacterSheetMenu extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType
    @Prop(Object) readonly rawCharacter!: RawCharacterType
    isOpen = false

    get printRoute () {
      return this.$router.currentRoute.path + '/print'
    }

    saveToFile () {
      const filename = (this.rawCharacter && this.rawCharacter.name) ? camelCase(this.rawCharacter.name) : 'incompleteCharacter'
      saveAs(new Blob(
        [JSON.stringify(this.rawCharacter)],
        { type: 'text/plain;charset=utf-8;' }),
        filename + '.json'
      )
      setTimeout(() => this.$emit('setClean'), 1000)
    }

    copyCharacter () {
      copy(JSON.stringify(this.rawCharacter))
      this.$emit('setClean')
      window.alert('Copied successfully!')
    }

    clearAllTweaks () {
      this.$emit('replaceCharacterProperty', { path: 'tweaks', property: {} })
      window.alert('All tweaks cleared!')
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      CharacterSheetMenuButton(text="Menu", icon="bars", :on="on")
    template(#title) Character Sheet Menu
    template(#text)
      div.d-flex.flex-column
        v-btn(@click="saveToFile").mt-2 Export To File
        v-btn(@click="copyCharacter").mt-2 Copy Text
        v-btn(:to="printRoute").mt-2 Print Sheet
        CharacterSheetExportToRoll20(v-bind="{ completeCharacter, rawCharacter }").mt-2
        v-btn(color="red", @click="clearAllTweaks").white--text.mt-2 Clear All Tweaks
        ConfirmDelete(
          :label="rawCharacter.name || 'Unnamed Character'",
          :item="rawCharacter.name || 'Unnamed Character'",
          @delete="$emit('deleteCharacter')"
        )
          template(v-slot="{ on }")
            v-btn(color="red", v-on="on").white--text.mt-2
              v-icon.mr-3 fa-skull-crossbones
              | Delete Character
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
