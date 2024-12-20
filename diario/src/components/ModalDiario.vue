<template>
    <div class="modal-overlay" v-if="visible">
      <div class="modal">
        <button class="close-button" @click="closeModal">×</button>
        <h2>Editar Diário</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="title">Título</label>
            <input type="text" id="title" v-model="diary.title" required>
          </div>
          <div class="form-group">
            <label for="description">Descrição</label>
            <textarea id="description" v-model="diary.description" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      diary: {
        type: Object,
        default: () => ({ title: '', description: '' })
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      submitForm() {
        // Aqui você pode adicionar a lógica de atualização do diário
        this.$emit('update', this.diary);
        this.closeModal();
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    max-width: 100%;
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
  </style>
  