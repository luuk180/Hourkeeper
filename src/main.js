import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue'

import "bootstrap/dist/js/bootstrap.js"

const app = createApp(App);
app.use(router)
app.use(
  createAuth0({
    domain: "dev-d0-elrpu.us.auth0.com",
    client_id: "BXTrydLqk5bcwWJkFkfe6xOjL7N6a3lp",
    redirect_uri: window.location.origin,
    audience: "https://api.hourkeeper.net"
  })
)

document.title = "Hourkeeper";

app.mount('#app');