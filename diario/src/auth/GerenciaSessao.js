import { reactive } from "vue";

const authState = reactive({
  isAuthenticated: !!localStorage.getItem("token"), // Inicializa com base no token armazenado
});


export const useAuth = () => {
  const login = (token) => {
    localStorage.setItem("token", token);
    authState.isAuthenticated = true; // Atualiza o estado reativo
  };

  const logout = () => {
    localStorage.removeItem("token");
    authState.isAuthenticated = false; // Atualiza o estado reativo
  };

  return {
    authState,
    login,
    logout,
  };
};
