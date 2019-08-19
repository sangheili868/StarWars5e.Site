<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const uiModule = namespace('ui')

  interface NavItem {
    title: string
    icon: string
    route: string,
    items?: NavItem[]
  }

  @Component
  export default class NavigationDrawer extends Vue {
    @uiModule.State isSideBarOpen!: boolean
    @uiModule.Action updateSideBar!: (value: boolean) => void

    @Prop(Array) readonly items!: NavItem[]
    @Prop(String) readonly baseRoute!: string

    hasSubItems ({ items }: NavItem) {
      return items && items.length
    }

    buildComponentProps (item: NavItem) {
      return this.hasSubItems(item) ? {
        is: 'v-list-group'
      } : {
        is: 'v-list-tile',
        exact: item.route === this.baseRoute,
        to: item.route
      }
    }
  }
</script>

<template lang="pug">
  v-navigation-drawer(
    :value="isSideBarOpen",
    :permanent="$vuetify.breakpoint.mdAndUp",
    fixed,
    app,
    clipped,
    :class="$vuetify.breakpoint.mdAndUp && $style.drawer",
    @input="updateSideBar"
  )
    v-list.dense
      component(v-for="(item, index) in items", :key="index", v-bind="buildComponentProps(item)")
        template(v-if="hasSubItems(item)" v-slot:activator)
          v-list-tile(:to="item.route")
            v-list-tile-action
              v-icon(:class="$style.icon") {{ item.icon }}
            v-list-tile-title {{ item.title }}
        template(v-if="hasSubItems(item)")
          v-list-tile(v-for="(subitem, index) in item.items", :key="index", :to="subitem.route")
            v-list-tile-action(:class="subitem.icon ? 'ml-5' : ''")
              v-icon(v-if="subitem.icon") {{ subitem.icon }}
            v-list-tile-title {{ subitem.title }}
        template(v-else)
          v-list-tile-action
            v-icon(:class="$style.icon") {{ item.icon }}
          v-list-tile-title {{ item.title }}
</template>

<style module lang="scss">
  .drawer {
    z-index: auto !important;

    .icon {
      text-align: center;
      width: 30px;
    }
  }
</style>
