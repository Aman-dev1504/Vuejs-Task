<template>
  <div class="profile">
    <div class="avatar">
      <img
        src="https://img.freepik.com/free-psd/3d-illustration-person-tank-top_23-2149436202.jpg?w=740&t=st=1693896892~exp=1693897492~hmac=db69c8574c1a81128270c1e8a377e62305c41a1e2f41383fc27ad5bfbdb01771"
        alt="User Avatar" />
    </div>
    <div class="form">
      <div class="p-field">
        <label for="email">Email</label>
        <InputText v-model="editedUser.email" id="email" disabled />
      </div>
      <div class="p-field">
        <label for="username">Username</label>
        <InputText v-model="editedUser.name" id="username" />
      </div>

      <div class="p-field">
        <label for="password">Password</label>
        <Password v-model="editedUser.password" id="password" />
      </div>
    </div>
    <div class="actions">
      <Button label="Update" @click="updateProfile" class="p-button-secondary" />
      <Button label="Cancel" @click="cancelEdit" class="btn" />
    </div>
  </div>
  <Toast />
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import store from '../store/store';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
const router = useRouter();
const toast = useToast();
const route = useRoute();
const id = route.params.id;

const editedUser = ref({
  _id: id,
  email: '',
  name: '',
  password: '',
});
const updateProfile = async () => {
  try {
    const res = await store.dispatch('updateUser', { id, userData: editedUser.value });
    if (res) {
      console.log('User profile updated successfully');
      toast.add({ severity: 'success', summary: 'User Updated' });
      router.push('/main');
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    toast.add({ severity: 'error', summary: 'Error User Updated' });
  }
};
const cancelEdit = () => {
  console.log('Edit canceled');
};
onMounted(async () => {
  try {
    const res = await store.dispatch('getUserById', id);
    if (res) {
      editedUser.value = {
        email: res.user.email,
        name: res.user.name,
        password: '********',
      };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});
</script>
<style scoped>
.profile {
  font-family: Roboto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
  gap: 40px;
}

.avatar img {
  height: 100px;
  border-radius: 50%;
}

.form {
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form label {
  font-weight: bold;
  margin-bottom: 8px;
}

.p-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.btn {
  background-color: darkgray;
}</style>
  