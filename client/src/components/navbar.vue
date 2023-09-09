
<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link :to="isLoggedInComputed ? '/main' : '/'">TaskFlow</router-link>

    </div>
    <div v-if="isLoggedInComputed">
      <div class="navbar-buttons">
        <Button class="p-button-sm button-custom button-join" @click="showCreateTaskDialog">Create Task</Button>
        <router-link :to="'/profile/' + userId">
          <Avatar
            image="https://img.freepik.com/free-psd/3d-illustration-person-tank-top_23-2149436202.jpg?w=740&t=st=1693896892~exp=1693897492~hmac=db69c8574c1a81128270c1e8a377e62305c41a1e2f41383fc27ad5bfbdb01771"
            class="mr-2 custom-user" size="large" shape="circle" />
        </router-link>

        <Button  icon= "pi pi-power-off" class="button-custom button-join power " raised @click="logout"></Button>
      </div>
    </div>
    <div v-else>
      <div class="navbar-buttons">

        <Button class="button-custom  button-join" raised @click="showLoginDialog"
          @onHide="loginDialogVisible = false">Login</button>
        <Button class="button-custom  button-join" raised @click="showSignupDialog"
          @onHide="signupDialogVisible = false">Signup</button>

      </div>
    </div>

    <LoginDialog v-model:visible="loginDialogVisible" @login-success="handleLoginSuccess" />
    <SignupDialog v-model:visible="signupDialogVisible" @signup-success="handleSignupSuccess" />
    <CreateTask
        v-model:visible="showTaskDialog"
      :dialogHeader="dialogHeader"
      :dialogWidth="dialogWidth"
      :dialogClass="dialogClass"
    />

  </nav>
  <Toast />
</template>
  
<script setup>
import Avatar from 'primevue/avatar';
import { useRouter } from 'vue-router';
const router = useRouter();
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
import { ref, computed, watch } from 'vue';
import LoginDialog from '../components/utils/LoginModel.vue';
import SignupDialog from '../components/utils/SignupModel.vue';
import CreateTask from '../components/utils/CreateTask.vue'
import Button from 'primevue/button';

const loginDialogVisible = ref(false);
const signupDialogVisible = ref(false);
const showTaskDialog = ref(false);



// Import store and compute isLoggedInComputed
import store from '../store/store';
const isLoggedInComputed = computed(() => store.getters.isLoggedIn);

// Watch isLoggedInComputed for changes
watch(isLoggedInComputed, (newValue) => {
  if (newValue) {
    loginDialogVisible.value = false;
    signupDialogVisible.value = false;
  }
});

// Define component methods
const showLoginDialog = () => {
  loginDialogVisible.value = true;
};

const showSignupDialog = () => {
  signupDialogVisible.value = true;
};
const showCreateTaskDialog = () => {
  showTaskDialog.value = true
};

const logout = async () => {
  try {
    await store.dispatch('logout').then(() => {
      toast.add({ severity: 'success', summary: 'Logout successful' });
      router.push('/');
    });
  } catch (error) {
    console.error('An error occurred during signup:', error);
    toast.add({ severity: 'error', summary: 'An error occurred during Logout' });
  }
};


</script>
  
<style scoped>
.navbar {
  position: relative;
  z-index: 999;
  max-height: 10vh;
  height: 10vh;
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.dialog-task{
  z-index: 9999;
}
.navbar-logo {
  font-size: 2.5rem;
  font-family: 'Yesteryear', cursive;
  font-weight: 300;
  text-decoration: none;

  margin-left: 20px;
}

.navbar-logo a {
  text-decoration: none;
  color: #673ab7ff;
}

.navbar-buttons {
  display: flex;
  gap: 1rem;
}

.button-join {
  height: 42px;
}

.custom-user {
  margin-right: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}

.power {
  text-align: center;
  background-color: rgb(222, 35, 35);
}

.power:hover {
  background-color: rgb(203, 32, 32);
}
</style>
  