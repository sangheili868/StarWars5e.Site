<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import CharacterExportToRoll20 from './CharacterExportToRoll20.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import copy from 'copy-to-clipboard'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { camelCase } from 'lodash'
  import { saveAs } from 'file-saver'
  import { CharacterValidationType } from '@/types/utilityTypes'

  @Component({
    components: {
      MyDialog,
      ConfirmDelete,
      CharacterExportToRoll20
    }
  })
  export default class CharacterMenu extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType | null
    @Prop(Object) readonly rawCharacter!: RawCharacterType
    @Prop(Object) readonly characterValidation!: CharacterValidationType

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
    }
  }
</script>

<template lang="pug">
  div.d-flex.flex-column
    slot
    v-btn(@click="saveToFile").mt-2 Export To File
    v-btn(@click="copyCharacter").mt-2 Copy Text
    v-btn(:to="printRoute").mt-2 Print Sheet
    CharacterExportToRoll20(v-bind="{ completeCharacter, rawCharacter, characterValidation }").mt-2
    ConfirmDelete(
      :label="rawCharacter.name || 'Unnamed Character'",
      :item="rawCharacter.name || 'Unnamed Character'",
      @delete="$emit('deleteCharacter')"
    )
      template(v-slot="{ on }")
        v-btn(color="red", v-on="on").white--text.mt-2
          v-icon.mr-3 fa-skull-crossbones
          | Delete Character
</template>
