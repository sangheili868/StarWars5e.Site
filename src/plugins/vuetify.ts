import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from '@/assets/styles/theme'
import store from '@/store'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: store.state.ui.isDarkSide,
    themes: {
      light: theme,
      dark: theme
    }
  },
  icons: {
    iconfont: 'fa'
  }
})
