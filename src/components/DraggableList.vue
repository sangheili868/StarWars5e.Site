<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Draggable from 'vuedraggable'

  @Component({
    components: {
      Draggable
    }
  })

  export default class DraggableList extends Vue {
    @Prop(Array) readonly items!: any[]
    @Prop(String) readonly propName!: string

    get draggableItems () {
      return this.$props.items
    }

    set draggableItems (newItems) {
      this.$emit('update', newItems)
    }
  }
</script>

<template lang="pug">
  Draggable(v-model="draggableItems").flex-grow-1
    slot
</template>
