import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Cadastro from '../components/Cadastro.vue';
import Perfil from '../components/Perfil.vue';
import NovoDiario from '../components/NovoDiario.vue';


const routes = [
  { path: '/', component: Login },
  { path: '/cadastro', component: Cadastro },
  { path: '/Perfil', component: Perfil },
  { path: '/NovoDiario', component: NovoDiario },

];

const router = createRouter({
  history: createWebHistory(), // Usa o modo de histórico para URLs limpas
  routes,
});



// Middleware para verificar autenticação
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o token está no localStorage
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Redireciona para o login se não estiver autenticado
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
