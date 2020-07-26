<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Draggable from 'vuedraggable'
  import isMobile from 'ismobilejs'

  @Component({
    components: {
      Draggable
    }
  })

  export default class DraggableList extends Vue {
    @Prop(Array) readonly items!: any[]
    @Prop(String) readonly propName!: string

    get isMobile () {
      return isMobile(navigator.userAgent).any
    }

    get draggableItems () {
      return this.$props.items
    }

    set draggableItems (newItems) {
      this.$emit('update', newItems)
    }
  }
</script>

<template lang="pug">
  div(v-if="isMobile", :class="$style.fullWidth")
    slot
  Draggable(v-else, v-model="draggableItems").flex-grow-1
    slot
</template>

<style lang="scss" module>
  .fullWidth {
    width: 100%;
  }
</style>
