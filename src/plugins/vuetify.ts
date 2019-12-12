import Vue from 'vue'
import Vuetify from 'vuetify'
import store from '@/store'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const theme = {
  primary: '#c40f0f',
  secondary: '#0d99cc',
  background: '#afc6d6',
  // Brands
  Reddit: '#ff4500',
  Discord: '#7289da',
  Twitter: '#1da1f2',
  Patreon: '#f96854'
}

export default new Vuetify({
  theme: {
    dark: store.state.ui.isDarkSide,
    themes: {
      light: theme,
      dark: {
        ...theme,
        secondary: '000000'
      }
    }
  },
  icons: {
    iconfont: 'fa'
  }
})
