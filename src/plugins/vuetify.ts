import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from '@/assets/styles/theme'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: theme,
      dark: theme
    }
  },
  icons: {
    iconfont: 'fa'
  }
})
