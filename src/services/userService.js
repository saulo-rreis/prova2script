import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/users'; // URL da API de usuários

export default {
    // Função para obter todos os usuários
    getAllUsers() {
        return axios.get(API_URL);
    },

    // Função para obter um usuário pelo ID
    getUserById(id) {
        return axios.get(`${API_URL}/${id}`);
    },

    // Função para adicionar um novo usuário
    addUser(user) {
        return axios.post(API_URL, user);
    },

    // Função para atualizar os dados de um usuário
    updateUser(user) {
        return axios.put(`${API_URL}/${user.id}`, user);
    },

    // Função para excluir um usuário
    deleteUser(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
};
