<template>
    <div class="containerbox">
      <div class="card">
        <div class="card-header">
          <h1>Editar Diário</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="salvarEdicao">
            <div class="form-group">
              <label for="titulo">Título</label>
              <input
                v-model="titulo"
                type="text"
                id="titulo"
                class="form-control"
                placeholder="Título"
                required
              />
            </div>
            <div class="form-group">
              <label for="descricao">Descrição</label>
              <textarea
                v-model="descricao"
                id="descricao"
                class="form-control"
                placeholder="Descrição"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">Salvar</button>
          </form>
          <button @click="excluirDiario" class="btn btn-danger w-100 mt-2">Excluir</button>
          <p class="mensagem">{{ mensagem }}</p>
        </div>
      </div>
    </div>
  </template>
  <script>
    import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        titulo: '',
        descricao: '',
        mensagem: '',
      };
    },
    async mounted() {
      const router = useRouter();
      const { id } = router.currentRoute.value.params;
  
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/listar/diario/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const diario = response.data[0]; // Assumindo que o backend retorna um array
        this.titulo = diario.titulo;
        this.descricao = diario.descricao;
      } catch (error) {
        console.error('Erro ao buscar diário:', error);
        this.mensagem = 'Erro ao buscar diário';
      }
    },
    methods: {
      async salvarEdicao() {
        const router = useRouter();
        const { id } = router.currentRoute.value.params;
  
        try {
          const token = localStorage.getItem('token');
          await axios.put(
            `http://localhost:3000/editarDiario/${id}`,
            { titulo: this.titulo, descricao: this.descricao },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.mensagem = 'Diário atualizado com sucesso!';
          router.push('/perfil');
        } catch (error) {
          console.error('Erro ao editar diário:', error);
          this.mensagem = 'Erro ao editar diário';
        }
      },
      async excluirDiario() {
        const router = useRouter();
        const { id } = router.currentRoute.value.params;
  
        if (!confirm('Tem certeza que deseja excluir este diário?')) {
          return;
        }
  
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:3000/deletarDiario/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.mensagem = 'Diário excluído com sucesso!';
          router.push('/perfil');
        } catch (error) {
          console.error('Erro ao excluir diário:', error);
          this.mensagem = 'Erro ao excluir diário';
        }
      },
    },
  };

</script>
  