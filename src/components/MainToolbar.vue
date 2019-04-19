<template lang="pug">
  v-toolbar(app, clipped-left)
    v-toolbar-title
      v-img(:src="require('@/assets/sw5e-logo.png')", width="100px")
    v-spacer
    v-toolbar-items
      v-btn(flat, color="primary", to="/") Home
      v-btn(flat, color="primary", to="/handbook") Handbook
      v-menu(open-on-hover, offset-y, attach)
        template(v-slot:activator="{ on }")
          v-btn(flat, color="primary", :ripple="false", v-on="on") Reference
            v-icon.pl-2 fa-caret-down
        v-list
          v-list-tile(to="/reference/species")
            v-list-tile-title Species
          v-list-tile(to="/reference/forcePowers")
            v-list-tile-title Force Powers
          v-list-tile(to="/reference/techPowers")
            v-list-tile-title Tech Powers
      v-btn(flat, color="primary", to="/credits") Credits
</template>
