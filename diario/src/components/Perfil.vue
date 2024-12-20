<template>
  <div class="perfil">
    <h2>Perfil</h2>

    <button @click="criarDiario" class="btn btn-primary mb-3">Criar Novo Diário</button>

    <div class="card-deck">
      <div v-for="diario in diarios" :key="diario.id" class="card">
        <div class="card-body">
          <h5 class="card-title">{{ diario.titulo }}</h5>
          <p class="card-text">{{ diario.descricao }}</p>
          <button @click="editarDiario(diario)" class="btn btn-warning">Editar</button>
          <button @click="deletarDiario(diario.id)" class="btn btn-danger">Deletar</button>
        </div>
      </div>
    </div>

    <!-- Modal para editar diário -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <h2>Editar Diário</h2>

        <form @submit.prevent="salvarEdicao">
          <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" id="titulo" v-model="diarioSelecionado.titulo" class="form-control" required>
          </div>

          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea id="descricao" v-model="diarioSelecionado.descricao" class="form-control" required></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Salvar Alterações</button>
          <button @click="fecharModal" class="btn btn-secondary">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuth } from '../auth/GerenciaSessao';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      diarios: [],
      mostrarModal: false,
      diarioSelecionado: null,
      auth: useAuth(),
    };
  },
  computed: {
    isAuthenticated() {
      return this.auth.authState.isAuthenticated; // está autenticado?
    },
  },
  async created() {
    this.buscarDiarios();
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    handleLogout() {
      this.auth.logout(); // Executa o logout
      this.router.push("/login"); // Redireciona para a página de login
    },
    goToLogin() {
      this.router.push("/login"); // Redireciona para login se o usuário não estiver autenticado
    },
    async buscarDiarios() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/listarDiarios', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        this.diarios = response.data.diarios;
      } catch (error) {
        console.error('Erro ao buscar diários:', error.response ? error.response.data : error.message);
      }
    },
    criarDiario() {
      this.router.push('/criarDiario');
    },
    editarDiario(diario) {
      this.diarioSelecionado = { ...diario };
      this.mostrarModal = true;
    },
    async salvarEdicao() {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3000/editar/${this.diarioSelecionado.id}`, {
          titulo: this.diarioSelecionado.titulo,
          descricao: this.diarioSelecionado.descricao
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Diário atualizado com sucesso!');

        this.buscarDiarios();

        this.mostrarModal = false;

      } catch (error) {
        console.error('Erro ao editar diário:', error.response ? error.response.data : error.message);
      }
    },
    fecharModal() {
      this.mostrarModal = false;
    },
    async deletarDiario(id) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/lista/diario/excluir/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        alert('Diário deletado com sucesso!');

        this.buscarDiarios();

      } catch (error) {
        console.error('Erro ao deletar diário:', error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>

<style scoped>
/* Adicione seu estilo aqui */
</style>