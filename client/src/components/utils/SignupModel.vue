<template>
    <Dialog v-model="visible" header="Register" width="300px">
        <form @submit.prevent="signup" :style="{ height: '40vh', width: '25vw' }">
            <div class="p-inputgroup flex-1 forminput" :class="{ 'error': usernameError }">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                </span>
                <InputText placeholder="Username" v-model="name" required @input="validateUsername" />
            </div>
            <div v-if="usernameError" class="error-message">{{ usernameError }}</div>
            <div class="p-inputgroup flex-1 forminput" :class="{ 'error': emailError }">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-comments"></i>
                </span>
                <InputText placeholder="Email" v-model="email" required @input="validateEmail" />
            </div>
            <div v-if="emailError" class="error-message">{{ emailError }}</div>
            <div class="p-inputgroup flex-1 forminput" :class="{ 'error': passwordError }">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-shield"></i>
                </span>
                <InputText placeholder="Password" v-model="password" type="password" required @input="validatePassword" />
            </div>
            <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
            <Button type="submit" label="Sign up" />
            <p>Already have an account?</p>
        </form>
        <Toast />
    </Dialog>
</template>
  
  
<script setup>
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
import { useStore } from 'vuex';
const store = useStore();
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
const visible = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const usernameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const signup = async () => {
    if (usernameError.value || emailError.value || passwordError.value) {
        toast.add({ severity: 'error', summary: 'Please fix the form errors' });
        return;
    }
    try {
        const result = await store.dispatch('register', {
            name: name.value,
            email: email.value,
            password: password.value,
        });
        if (result.success) {
            visible.value = true;
            toast.add({ severity: 'success', summary: 'Signup successful' });
            name.value = '';
            email.value = '';
            password.value = '';
            usernameError.value = '';
            emailError.value = '';
            passwordError.value = '';
        } 
    } catch (error) {
        console.error('An error occurred during signup:', error);
        toast.add({ severity: 'error', summary: 'An error occurred during signup' });
    }
};
const validateUsername = () => {
    if (!name.value.trim()) {
        usernameError.value = 'Username is required';
    } else {
        usernameError.value = '';
    }
};

const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email.value)) {
        emailError.value = 'Invalid email format';
    } else {
        emailError.value = '';
    }
};

const validatePassword = () => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password.value)) {
        passwordError.value =
            'Password must contain at least one letter, one number, and be at least 8 characters long';
    } else {
        passwordError.value = '';
    }
};
</script>
<style scoped>
.forminput {
    margin-top: 10px;

}

Button {
    margin-top: 20px;
}

p {
    margin-top: 10px;
}

.error-message {
    color: red;
    margin-top: 5px;
    font-size: 14px;
}
</style>