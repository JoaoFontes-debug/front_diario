import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/Login.vue';
import cadastro from '../components/Cadastro.vue';
import perfil from '../components/Perfil.vue';
import criarDiario from '../components/CriarDiario.vue';
import editarDiario from '../components/EditarDiario.vue';



const routes = [
  { path: '/Login', component: login },
  { path: '/Cadastro', component: cadastro },
  { path: '/Perfil', component: perfil },
  { path: '/CriarDiario', component: criarDiario },
  { path: '/EditarDiario/:id', component: editarDiario },
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