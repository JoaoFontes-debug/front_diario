import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o router configurado

const app = createApp(App);

app.use(router); // Habilita o Vue Router na aplicação
app.mount('#app');