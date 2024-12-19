<template>
    <div class="criar-diario">
      <h2>Criar Novo Diário</h2>
      <form @submit.prevent="criarDiario">
        <div class="form-group">
          <label for="titulo">Título</label>
          <input type="text" id="titulo" v-model="titulo" required>
        </div>
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" v-model="descricao" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Criar Diário</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name:"NovoDiario",
    data() {
      return {
        titulo: '',
        descricao: ''
      };
    },
    methods: {
      async criarDiario() {
        try {
          const token = localStorage.getItem('token');
          await axios.post('http://localhost:3000/criarDiario', {
            titulo: this.titulo,
            descricao: this.descricao
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          alert('Diário criado com sucesso!');
          this.$router.push('/perfil');
        } catch (error) {
          console.error('Erro ao criar diário:', error.response ? error.response.data : error.message);
        }
      }
    }
  };
  </script>
  
  <style