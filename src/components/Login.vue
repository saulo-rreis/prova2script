<template>
  <div class="container">
    <h1 class="my-4 text-center">Login</h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Please log in</h5>
            <form @submit.prevent="handleLogin">
              <!-- Campo de usuário -->
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="username"
                    placeholder="Enter your username"
                    required
                />
              </div>
              <!-- Campo de senha -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    placeholder="Enter your password"
                    required
                />
              </div>
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../services/authService"
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      // Substitua com sua lógica de login
      if (this.username === 'admin' && this.password === 'password') {
        // Redirecionar para o dashboard após login bem-sucedido
        this.$router.push('/dashboard');
      } else {
        // Exibir um alerta em caso de erro
        alert('Invalid credentials');
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
}

.card-body {
  padding: 2rem;
}

.card-title {
  margin-bottom: 1rem;
}

.btn-link {
  font-size: 0.875rem;
  color: #007bff;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
