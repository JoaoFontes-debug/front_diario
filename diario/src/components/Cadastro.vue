<template>
    <div class="register-container">
      <h1>Cadastro</h1>
      <form @submit.prevent="register">
        <div>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="nome" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="senha">Senha:</label>
          <input type="password" id="senha" v-model="senha" required />
        </div>
        <button type="submit">Registrar</button>
        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name:'Cadastro',
    data() {
      return {
        nome: "",
        email: "",
        senha: "",
        message: null,
        error: null,
      };
    },
    methods: {
      async register() {
        try {
          const response = await fetch("http://localhost:3000/registro", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: this.nome,
              email: this.email,
              senha: this.senha,
            }),
          });
  
          if (!response.ok) {
            const { error } = await response.json();
            throw new Error(error || "Erro ao registrar.");
          }
  
          const { message } = await response.json();
          this.message = message;
          this.$router.push("/");
        } catch (err) {
          this.error = err.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  </style>
  