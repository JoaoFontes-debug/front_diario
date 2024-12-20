import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o router configurado
import axios from 'axios';

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:3000'; // URL base da API
axios.defaults.headers.common['Content-Type'] = 'application/json';

app.use(router); // Habilita o Vue Router na aplicação
app.mount('#app');