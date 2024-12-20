<template>
  <div>
    <h1>Registrar Pessoa</h1>
    <form @submit.prevent="registrarPessoa">
      <input v-model="nome" placeholder="Nome" required />
      <input v-model="email" placeholder="Email" required />
      <input v-model="senha" type="password" placeholder="Senha" required />
      <button type="submit">Registrar</button>
    </form>
    <p>{{ mensagem }}</p>
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