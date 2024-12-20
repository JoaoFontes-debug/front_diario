<template>
    <div>
      <h1>Criar Diário</h1>
      <form @submit.prevent="criarDiario">
        <input v-model="titulo" placeholder="Título" required />
        <textarea v-model="descricao" placeholder="Descrição" required></textarea>
        <button type="submit">Criar</button>
      </form>
      <p>{{ mensagem }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        titulo: '',
        descricao: '',
        mensagem: ''
      };
    },
    methods: {
      async criarDiario() {
        try {
          const response = await axios.post('/criarDiario', {
            titulo: this.titulo,
            descricao: this.descricao
          });
          this.mensagem = response.data.message;
        } catch (error) {
          console.error('Erro ao criar diário:', error);
          this.mensagem = 'Erro ao criar diário';
        }
      }
    }
  };
  </script>