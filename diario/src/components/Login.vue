<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" required />
      <input v-model="senha" type="password" placeholder="Senha" required />

      <button type="submit">Login</button>

    </form>
    <p>{{ mensagem }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuth } from '../auth/GerenciaSessao';
import router from '../router/index';

export default {
  data() {
    return {
      email: '',
      senha: '',
      mensagem: ''
    };
  },
  methods: {
    async login() {
      const {login} = useAuth();

      try {
        const response = await axios.post('/login', {
          email: this.email,
          senha: this.senha
        });

        const { token } = response.data;
        // Armazena o token para futuras requisições
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        router.push("/perfil");
        login(response.data.token); //atualiza o estado   
        this.mensagem = 'Login realizado com sucesso!';

      } catch (error) {
        console.error('Erro no login:', error);
        this.mensagem = 'Erro no login';
      }
    }
  }
};
</script>
