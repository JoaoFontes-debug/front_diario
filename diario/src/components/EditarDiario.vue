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
  import { useRoute } from 'vue-router';
  import router from '../router';
  
  export default {
    data() {
      return {
        Pk_diario: '',
        titulo: '',
        descricao: '',
        mensagem: '',
      };
    },
    async mounted() {
      
      // console.log("ROTA DE ERRO", router.currentRoute.value.params);
      // const { Pk_diario } = router.currentRoute.value.params;
      const { Pk_diario } = router.currentRoute.value.params;
      console.log("diario no form", Pk_diario);
      try {
        const token = localStorage.getItem('token');
        //aqui pegamos as informaçoes atuais do diario para exibir no formulario
        const response = await axios.get(`http://localhost:3000/listarDiario/${Pk_diario}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //aqui pegamos o diario e setamos o titulo e descrição para exibir no formulario
        //onde dava erro de nao aparecer o titulo e descrição no formulario
        const diario = response.data.diario; 
        
        this.titulo = diario.titulo;
        this.descricao = diario.descricao;

      } catch (error) {
        console.error('Erro ao buscar diário:', error);
        this.mensagem = 'Erro ao buscar diário';
      }
    },

    setup() {
      const router = useRouter();
      console.log("ERRO NO SETUP", router);
      const params = router.currentRoute.value.params;
      return { router, params };
    },

    methods: {
      //SALVAR EDIÇÃO DO DIARIO
      async salvarEdicao() {
        console.log("params", this.params.Pk_diario);
        // const { Pk_diario } = router.params;
        
        try {
          const token = localStorage.getItem('token');
          await axios.put(
            `http://localhost:3000/editarDiario/${this.params.Pk_diario}`,
            {titulo: this.titulo, descricao: this.descricao },
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
    //EXCLUIR DIARIO
      async excluirDiario() {
        const { Pk_diario } = router.currentRoute.value.params;
        if (!confirm('Tem certeza que deseja excluir este diário?')) {
          return;
        }
  
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:3000/deletarDiario/${Pk_diario}`, {
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
  