<template>
  <div class="perfil">
    <h2>Perfil</h2>

    <button @click="criarDiario" class="btn btn-primary mb-3">Criar Novo Diário</button>

    <div class="card-deck">
      <div v-for="diario in diarios" :key="diario.Pk_diario" class="card" @click="abrirModal(diario)">

        <div class="card-body">

          <h5 class="card-title">{{ diario.titulo }}</h5>
          <p class="card-text text-truncate">{{ diario.descricao }}</p>
          <p class="card-text">{{ diario.Pk_diario }}</p>
          <button @click.stop="abrirModal(diario)" class="btn btn-info">Folhear</button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="spinner">Carregando...</div>

    <!-- Modal -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-content">

        <button class="close-button" @click="fecharModal">×</button>

        <h2>{{ diarioSelecionado.titulo }}</h2>
        <p>{{ diarioSelecionado.descricao }}</p>

        <div class="modal-actions">
          <button @click="editarDiario(diarioSelecionado)" class="btn btn-warning">Editar</button>
          <button @click="deletarDiario(diarioSelecionado)" class="btn btn-danger">Deletar</button>
        </div>

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
      loading: false,
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
      this.loading = true;
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
      } finally {
        this.loading = false;
      }
    },

    criarDiario() {
      this.router.push('/criarDiario');
    },

    abrirModal(diario) {
      console.log("diario no modal ", diario);
      this.diarioSelecionado = { ...diario };
      this.mostrarModal = true;
    },

    fecharModal() {
      this.mostrarModal = false;
    },

    editarDiario(diario) {
      this.router.push(`/editarDiario/${diario.Pk_diario}`);
      console.log("diario na funçao editar do perfil ", diario);
     
      
    },

    async deletarDiario(diario) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/deletarDiario/${diario.Pk_diario}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        alert('Diário deletado com sucesso!');
        this.buscarDiarios();
        this.fecharModal();
      } catch (error) {
        console.error('Erro ao deletar diário:', error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>

<style scoped>
.perfil {
  padding: 20px;
}

.card-deck {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

}

.card {
  width: 200px;
  cursor: pointer;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: scroll;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>