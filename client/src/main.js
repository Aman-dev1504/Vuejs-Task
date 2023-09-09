import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import axios from 'axios';
import ToastService from 'primevue/toastservice';
import store from './store/store';
import '@/assets/main.css'
import 'primevue/resources/themes/md-light-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';   
import AOS from 'aos'
import 'aos/dist/aos.css'
const app = createApp(App)
AOS.init();
axios.defaults.baseURL = 'http://localhost:8080';
app.use(PrimeVue);
app.use(store)
app.use(ToastService);
app.use(router)
app.mount('#app')
