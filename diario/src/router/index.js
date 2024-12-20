import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/Login.vue';
import cadastro from '../components/Cadastro.vue';
import perfil from '../components/Perfil.vue';
import criarDiario from '../components/NovoDiario.vue';


const routes = [
  { path: '/login', component: login },
  { path: '/cadastro', component: cadastro },
  { path: '/perfil', component: perfil },
  { path: '/criarDiario', component: criarDiario },

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
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
