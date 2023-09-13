<template>
  <Dialog v-model="visible" header="Create Task" width="400px">
    <form @submit.prevent="createTask" :style="{ height: '70vh', width: '40vw' }">
      <div class="p-inputgroup flex-1 " :class="{ 'error': titleError }">
        <span class="p-inputgroup-addon">
          <i class="pi pi-tag"></i>
        </span>
        <InputText placeholder="Title" v-model="newTask.title" required @input="validateTitle" />
      </div>
      <div v-if="titleError" class="error-message">{{ titleError }}</div>
      <div class="p-inputgroup flex-1 forminput" :class="{ 'error': descriptionError }">
        <span class="p-inputgroup-addon">
          <i class="pi pi-align-left"></i>
        </span>
        <Textarea placeholder="Description" v-model="newTask.description" required @input="validateDescription" />
      </div>
      <div v-if="descriptionError" class="error-message">{{ descriptionError }}</div>
      <div class="p-inputgroup flex-1 forminput" :class="{ 'error': dueDateError }">
        <span class="p-inputgroup-addon">
          <i class="pi pi-calendar"></i>
        </span>
        <Calendar placeholder="Due Date" v-model="newTask.dueDate" :minDate="minDate" required />
      </div>
      <div v-if="dueDateError" class="error-message">{{ dueDateError }}</div>
      <div class="p-inputgroup flex-1 forminput" :class="{ 'error': priorityError }">
        <span class="p-inputgroup-addon">
          <i class="pi pi-sort-alt"></i>
        </span>
        <Dropdown placeholder="Priority" id="priority" v-model="newTask.priority" :options="priorityOptions"
          optionLabel="label" optionValue="value" required />
      </div>
      <div v-if="priorityError" class="error-message">{{ priorityError }}</div>
      <div class="p-inputgroup flex-1 forminput" :class="{ 'error': categoryError }">
        <span class="p-inputgroup-addon">
          <i class="pi pi-hashtag"></i>
        </span>
        <Dropdown placeholder="Category" id="category" v-model="newTask.category" :options="categoryOptions"
          optionLabel="label" optionValue="value" required />
      </div>
      <div v-if="priorityError" class="error-message">{{ priorityError }}</div>

      <div v-if="categoryError" class="error-message">{{ categoryError }}</div>
      <div class="p-inputgroup flex-1 forminput" :class="{ 'error': sharedWithError }">
        <span class="p-inputgroup-addon">
          <i class="pi pi-users"></i>
        </span>
        <MultiSelect id="sharedWith" v-model="selectedUsers" :options="userOptions" optionLabel="name" optionValue="id"
          appendTo="body" placeholder="Share with"  />
      </div>
      <div v-if="sharedWithError" class="error-message">{{ sharedWithError }}</div>
      <Button type="submit" label="Create" class="btn" />
    </form>
    <Toast />
  </Dialog>
</template>
  
  
<script setup>
import { onMounted,computed } from 'vue';
import { ref, watch, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import store from '../../store/store';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
onMounted(async () => {
  await fetchUsers();
 
});


const props = defineProps(['createTaskFunction']);
const emits = defineEmits();
const toast = useToast();
const visible = ref(false);
const id = store.getters.userId;
const newTask = ref({
  title: '',
  description: '',
  dueDate: null,
  priority: '',
  category: '',
  sharedWith: [],
  user: id,
});

const minDate = computed(() => {
      return new Date();
    });

 


const userOptions = ref([]); 
const selectedUsers = ref([]);
watch(selectedUsers, (newSelectedUsers) => {
  newTask.value.sharedWith = newSelectedUsers;
});
const priorityOptions = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];
const categoryOptions = [
  { label: 'Tech', value: 'Tech' },
  { label: 'Study', value: 'Study' },
  { label: 'Daily', value: 'Daily' },
];
const fetchUsers = async () => {
  try {
    const res = await store.dispatch('fetchAllUsers');
    console.log(res)
    if (res) {
      const currentUserId = store.getters.userId; 
      userOptions.value = res.users
        .filter((user) => user._id !== currentUserId) 
        .map((user) => ({
          id: user._id,
          name: user.name,
        }));
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
const createTask = async () => {
  try {
    console.log(newTask.value.sharedWith);
    const res = await store.dispatch('createTask', newTask.value);
    if (res) {
      toast.add({ severity: 'success', summary: 'Task Created' });
      visible.value = false;
      newTask.value = {
        title: '',
        description: '',
        dueDate: null,
        priority: '',
        category: '',
        sharedWith: [],
        user: id,
      };
      selectedUsers.value = [];
      await store.dispatch('fetchTasks');
      emits('create-task', res);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.forminput {
  margin-top: 20px;
}

.btn {
  margin-top: 20px;
}
</style>
  