<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import MySelect from '@/components/MySelect.vue'
  import { ClassType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import { range } from 'lodash'
  import ClassDetail from '@/components/ClassDetail.vue'

  @Component({
    components: {
      MyDialog,
      MySelect,
      ClassDetail
    }
  })
  export default class CharacterBuilderClassNew extends Vue {
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly currentClasses!: RawClassType[]
    @Prop(Number) readonly currentLevel!: number

    isOpen = false
    chosenClass = ''
    range = range

    get classChoices () {
      const currentClassList = this.currentClasses.map(({ name }) => name)
      return this.classes.map(({ name }) => name).filter(name => !currentClassList.includes(name))
    }

    get classData () {
      return this.classes.find(({ name }) => name === this.chosenClass)
    }

    handleAdd () {
      this.$emit('add', this.chosenClass)
      this.isOpen = false
    }
  }
</script>

<template lang="pug">
  MyDialog(v-if="currentLevel < 20", v-model="isOpen", wide)
    template(v-slot:activator="{ on }")
      v-btn(color="primary", v-on="on", @click="chosenClass=''").mt-3 Add New Class
    template(#title) Add New Class
    template(#text)
      MySelect(v-model="chosenClass", :items="classChoices", label="Choose a class")
      ClassDetail(v-bind="{ classData }", isHidingBack).mt-5
    template(#actions)
      v-btn(color="primary", :disabled="!chosenClass", @click="handleAdd") Add Class
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Cancel
</template>
