<template>
  <div class="container">
    <h1 class="my-4 text-center">Users Management</h1>

    <!-- Visão Geral dos Indicadores -->
    <div class="row mb-4">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">Total Users</h5>
            <p class="card-text">{{ totalUsers }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela de Usuários -->
    <div class="mb-3">
      <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Search users by name or email"
          @input="searchUsers"
      />
    </div>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.name.firstname }} {{ user.name.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address.city }}</td>
          <td>
            <button class="btn btn-info" @click="viewUserDetails(user.id)">View</button>
            <button class="btn btn-warning" @click="editUser(user.id)">Edit</button>
            <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Detalhes de Usuário -->
    <div class="modal" tabindex="-1" v-if="isModalOpen">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">User Details</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p><strong>Name:</strong> {{ currentUser.name.firstname }} {{ currentUser.name.lastname }}</p>
            <p><strong>Email:</strong> {{ currentUser.email }}</p>
            <p><strong>City:</strong> {{ currentUser.address.city }}</p>
            <p><strong>Street:</strong> {{ currentUser.address.street }}</p>
            <p><strong>Phone:</strong> {{ currentUser.phone }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Cadastro de Usuário -->
    <div class="modal" tabindex="-1" v-if="isAddUserModalOpen">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New User</h5>
            <button type="button" class="btn-close" @click="closeAddUserModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addUser">
              <div class="mb-3">
                <label for="firstname" class="form-label">First Name</label>
                <input type="text" id="firstname" class="form-control" v-model="newUser.name.firstname" required />
              </div>
              <div class="mb-3">
                <label for="lastname" class="form-label">Last Name</label>
                <input type="text" id="lastname" class="form-control" v-model="newUser.name.lastname" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" v-model="newUser.email" required />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input type="text" id="phone" class="form-control" v-model="newUser.phone" required />
              </div>
              <div class="mb-3">
                <label for="city" class="form-label">City</label>
                <input type="text" id="city" class="form-control" v-model="newUser.address.city" required />
              </div>
              <div class="mb-3">
                <label for="street" class="form-label">Street</label>
                <input type="text" id="street" class="form-control" v-model="newUser.address.street" required />
              </div>
              <div class="mb-3">
                <label for="zipcode" class="form-label">Zipcode</label>
                <input type="text" id="zipcode" class="form-control" v-model="newUser.address.zipcode" required />
              </div>
              <button type="submit" class="btn btn-primary">Add User</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Edição de Usuário -->
    <div class="modal" tabindex="-1" v-if="isEditUserModalOpen">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button type="button" class="btn-close" @click="closeEditUserModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser">
              <div class="mb-3">
                <label for="editFirstname" class="form-label">First Name</label>
                <input type="text" id="editFirstname" class="form-control" v-model="editUser.name.firstname" required />
              </div>
              <div class="mb-3">
                <label for="editLastname" class="form-label">Last Name</label>
                <input type="text" id="editLastname" class="form-control" v-model="editUser.name.lastname" required />
              </div>
              <div class="mb-3">
                <label for="editEmail" class="form-label">Email</label>
                <input type="email" id="editEmail" class="form-control" v-model="editUser.email" required />
              </div>
              <div class="mb-3">
                <label for="editPhone" class="form-label">Phone</label>
                <input type="text" id="editPhone" class="form-control" v-model="editUser.phone" required />
              </div>
              <div class="mb-3">
                <label for="editCity" class="form-label">City</label>
                <input type="text" id="editCity" class="form-control" v-model="editUser.address.city" required />
              </div>
              <div class="mb-3">
                <label for="editStreet" class="form-label">Street</label>
                <input type="text" id="editStreet" class="form-control" v-model="editUser.address.street" required />
              </div>
              <div class="mb-3">
                <label for="editZipcode" class="form-label">Zipcode</label>
                <input type="text" id="editZipcode" class="form-control" v-model="editUser.address.zipcode" required />
              </div>
              <button type="submit" class="btn btn-warning">Update User</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Botão de Adicionar Novo Usuário -->
    <div class="text-center my-4">
      <button class="btn btn-success" @click="openAddUserModal">Add New User</button>
    </div>
  </div>
</template>

<script>
import api from "@/services/userService"; // Certifique-se de que o caminho da importação esteja correto

export default {
  name: 'Users',
  data() {
    return {
      users: [],
      filteredUsers: [],
      searchQuery: '',
      totalUsers: 0,
      currentUser: {},
      newUser: {
        name: {
          firstname: '',
          lastname: ''
        },
        email: '',
        phone: '',
        address: {
          city: '',
          street: '',
          zipcode: ''
        }
      },
      editUser: {},
      isModalOpen: false,
      isAddUserModalOpen: false,
      isEditUserModalOpen: false,
    };
  },
  methods: {
    fetchUsers() {
      api.getAllUsers() // Alterado para "getAllUsers"
          .then(response => {
            this.users = response.data;
            this.filteredUsers = this.users;
            this.totalUsers = this.users.length;
          })
          .catch(error => {
            console.error("Error fetching users:", error);
          });
    },
    addUser() {
      api.addUser(this.newUser) // Alterado para "addUser"
          .then(response => {
            this.users.push(response.data);
            this.filteredUsers = this.users;
            this.totalUsers++;
            this.closeAddUserModal();
          })
          .catch(error => {
            console.error("Error adding user:", error);
          });
    },
    editUser(userId) {
      const user = this.users.find(user => user.id === userId);
      this.editUser = {...user}; // Cria uma cópia do usuário para editar
      this.isEditUserModalOpen = true;
    },
    updateUser() {
      api.updateUser(this.editUser) // Alterado para "updateUser"
          .then(response => {
            const index = this.users.findIndex(user => user.id === this.editUser.id);
            this.users[index] = response.data;
            this.filteredUsers = this.users;
            this.closeEditUserModal();
          })
          .catch(error => {
            console.error("Error updating user:", error);
          });
    },
    deleteUser(userId) {
      api.deleteUser(userId) // Alterado para "deleteUser"
          .then(() => {
            this.users = this.users.filter(user => user.id !== userId);
            this.filteredUsers = this.users;
            this.totalUsers--;
          })
          .catch(error => {
            console.error("Error deleting user:", error);
          });
    },
    viewUserDetails(userId) {
      const user = this.users.find(user => user.id === userId);
      this.currentUser = {...user};
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openAddUserModal() {
      this.isAddUserModalOpen = true;
    },
    closeAddUserModal() {
      this.isAddUserModalOpen = false;
      this.newUser = {
        name: {
          firstname: '',
          lastname: ''
        },
        email: '',
        phone: '',
        address: {
          city: '',
          street: '',
          zipcode: ''
        }
      };
    },
    closeEditUserModal() {
      this.isEditUserModalOpen = false;
    },
    searchUsers() {
      this.filteredUsers = this.users.filter(user => {
        return (
            user.name.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.name.lastname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
/* Adicione estilos personalizados aqui */
</style>