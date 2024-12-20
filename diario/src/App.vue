<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <router-link v-if="!authState.isAuthenticated" to="/login" class="nav-item">Login</router-link>
        <router-link v-if="!authState.isAuthenticated" to="/cadastro" class="nav-item">Cadastro</router-link>

        <router-link v-if="authState.isAuthenticated" to="/perfil" class="nav-item">Perfil</router-link>
        <button v-if="authState.isAuthenticated" @click="handleLogout" class="nav-item logout">Sair</button>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      
    </footer>
  </div>
</template>

<script>
  import { computed } from 'vue';
  import { useAuth } from './auth/GerenciaSessao';
  import { useRouter } from 'vue-router';

export default {
  setup(){
    const { authState, logout } = useAuth();
    const router = useRouter();

    const isAuthenticated = computed(() =>{
      return authState.isAuthenticated;
    });

    const handleLogout = () => {
      logout(); // Executa o logout
      router.push("/login"); // Redireciona para a página de login
    };

    return { authState, logout, isAuthenticated, handleLogout };
  } 
  
};
</script>

<style scoped>
/* Estilos básicos para o App.vue */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #007bff;
  padding: 1rem;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.nav-item:hover {
  text-decoration: underline;
}

.logout {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

footer {
  text-align: center;
  background-color: #f8f9fa;
  padding: 1rem;
  font-size: 0.9rem;
  border-top: 1px solid #e9ecef;
}
</style>
