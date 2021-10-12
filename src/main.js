import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import store from './store'
import apolloProvider from './apollo'

const app = createApp(App)
app.use(Quasar, quasarUserOptions)
app.use(store)
app.use(router)
app.use(apolloProvider)

app.mount('#app')
