import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importar Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

// Importar SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// Importar FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit, faTrash, faPlus, faSave, faTimes)

const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')