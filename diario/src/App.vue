<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <router-link to="/" class="nav-item">Login</router-link>
        <router-link to="/cadastro" class="nav-item">Cadastro</router-link>
        <router-link v-if="isAuthenticated" to="/perfil" class="nav-item">Perfil</router-link>
        <router-link v-if="isAuthenticated" to="/diarios" class="nav-item">Meus Diários</router-link>
        <button v-if="isAuthenticated" @click="logout" class="nav-item logout">Sair</button>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2024 Minha Aplicação</p>
    </footer>
  </div>
</template>

<script>

export default {
  computed: {
    isAuthenticated() {
      // Verifica se o token JWT está presente no localStorage
      return !!localStorage.getItem("token");
    },
  },
  methods: {
    logout() {
      // Remove o token do localStorage e redireciona para o login
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
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
