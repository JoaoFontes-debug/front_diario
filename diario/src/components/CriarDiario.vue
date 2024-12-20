<template>
    <div class="containerbox">
      <div class="card">
        <div class="card-header">
          <h1>Criar Diário</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="criarDiario">
            <div class="form-group">
              <label for="titulo">Título</label>
              <input v-model="titulo" type="text" id="titulo" class="form-control" placeholder="Título" required />
            </div>
            <div class="form-group">
              <label for="descricao">Descrição</label>
              <textarea v-model="descricao" id="descricao" class="form-control" placeholder="Descrição" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">Criar</button>
          </form>
          <p class="mensagem">{{ mensagem }}</p>
        </div>
      </div>
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
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
  
  .containerbox {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(24, 22, 22);
    background-size: cover;
    background-repeat: no-repeat;
  }
  
  .card {
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Dancing Script', cursive;
  }
  
  .card-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .card-header h1 {
    font-size: 32px;
    margin: 0;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
  }
  
  .form-control:focus {
    border-color: #4a90e2;
    outline: none;
  }
  
  .btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
  .mensagem {
    margin-top: 15px;
    text-align: center;
    color: #ff0000;
  }
  </style>