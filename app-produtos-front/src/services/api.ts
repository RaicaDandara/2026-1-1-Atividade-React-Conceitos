import axios from "axios";

// Cria uma instância do Axios configurada com URL base e headers padrão
const api = axios.create({
  baseURL: process.env.API_URL ? process.env.API_URL : "https://dummyjson.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para buscar todos os produtos da API
const getProdutosTodos = () => {
  return api.get("/products/");
};

export { getProdutosTodos };
export default api;
