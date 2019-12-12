<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ClassType } from '@/types/characterTypes'
  import ClassDetail from '@/components/ClassDetail.vue'

  const classesModule = namespace('classes')

  @Component({
    components: {
      ClassDetail
    }
  })
  export default class CharacterClassDetail extends Vue {
    @classesModule.State classes!: ClassType[]
    @classesModule.Action fetchClasses!: () => void
    @Prop(String) readonly className!: string

    created () {
      this.fetchClasses()
    }

    get title () {
        return this.className + Vue.prototype.$titleSuffix
    }

    get classData () {
      return this.classes.find(({ name }) => name === this.className)
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(:title="title")
    ClassDetail(v-bind="{ classData }")
</template>
