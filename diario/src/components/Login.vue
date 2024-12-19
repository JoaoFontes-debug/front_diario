<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="senha">Senha:</label>
          <input type="password" id="senha" v-model="senha" required />
        </div>
        <button type="submit">Entrar</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name:'login',
    data() {
      return {
        email: "",
        senha: "",
        error: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              senha: this.senha,
            }),
          });
  
          if (!response.ok) {
            const { error } = await response.json();
            throw new Error(error || "Erro ao fazer login.");
          }
  
          const { token } = await response.json();
          this.$emit("login-success", token);

          this.$router.push("/perfil"); // Redireciona para o perfil
        } catch (err) {
          this.error = err.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  
  .error {
    color: red;
  }
  </style>
  