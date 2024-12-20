<template>
  <div class="containerbox">
    <div class="boxCadastro">
      <form @submit.prevent="registrarPessoa">
        <div class="header">
          <img src="https://www.psicologoeterapia.com.br/wp-content/uploads/beneficios-de-manter-um-diario-para-a-saude-mental-1024x768.jpg" />
          <h1 class="titulo">Cadastre-se</h1>
        </div>

        <div class="mb-3">
          <label for="nome" class="form-label">Nome:</label>
          <input
            v-model="nome"
            type="text"
            class="form-control"
            id="nome"
            placeholder="Digite seu nome"
            name="nome"
          />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Digite seu email"
            name="email"
          />
        </div>

        <div class="mb-3">
          <label for="senha" class="form-label">Senha:</label>
          <input
            v-model="senha"
            type="password"
            class="form-control"
            id="senha"
            placeholder="Digite sua senha"
            name="senha"
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuth } from '../auth/GerenciaSessao';
import router from '../router';

export default {
  data() {
    return {
      nome: '',
      email: '',
      senha: '',
      mensagem: ''
    };
  },
  methods: {
    async registrarPessoa() {
      try {
        // Registrar a pessoa
        const response = await axios.post('/cadastro', {
          nome: this.nome,
          email: this.email,
          senha: this.senha
        });

        // Mensagem de sucesso
        this.mensagem = response.data.message;

        // Fazer login automaticamente após o registro
        const loginResponse = await axios.post('/login', {
          email: this.email,
          senha: this.senha
        });

        const { token } = loginResponse.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Atualizar o estado de autenticação
        const { login } = useAuth();
        login(token);

        // Redirecionar para a página de perfil
        router.push('/perfil');
      } catch (error) {
        console.error('Erro ao registrar pessoa:', error);
        this.mensagem = 'Erro ao registrar pessoa';
      }
    }
  }
};
</script>

<style>
.containerbox {
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
  background-size: cover; /* Garante que o background cubra toda a tela */
  background-repeat: no-repeat; /* Evita a repetição do background */
}

.boxCadastro {
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.95);
  text-align: center;
  font-family: 'Dancing Script', cursive;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.titulo {
  font-size: 40px;
  margin-bottom: 10px;
}

img {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
}

.form-control {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
}

.form-control:focus {
  border-color: #4a90e2;
  outline: none;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>