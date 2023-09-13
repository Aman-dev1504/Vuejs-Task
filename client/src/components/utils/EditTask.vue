<template>
  <div class="main">
  <form @submit.prevent="editTask" :style="{ height: '70vh', width: '40vw' } ">
   <h3>Edit task</h3>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-tag"></i>
      </span>
      <InputText placeholder="Title" v-model="editedTask.title" required />
    </div>
    <div class="p-inputgroup flex-1 forminput">
      <span class="p-inputgroup-addon">
        <i class="pi pi-align-left"></i>
      </span>
      <Textarea placeholder="Description" v-model="editedTask.description" required />
    </div>
    <div class="p-inputgroup flex-1 forminput">
      <span class="p-inputgroup-addon">
        <i class="pi pi-calendar"></i>
      </span>
      <Calendar placeholder="Due Date" v-model="editedTask.dueDate" required />
    </div>

    <div class="p-inputgroup flex-1 forminput">
      <span class="p-inputgroup-addon">
        <i class="pi pi-sort-alt"></i>
      </span>
      <Dropdown placeholder="Priority" id="priority" v-model="editedTask.priority" :options="priorityOptions"
        optionLabel="label" optionValue="value" required />
    </div>

    <div class="p-inputgroup flex-1 forminput">
      <span class="p-inputgroup-addon">
        <i class="pi pi-hashtag"></i>
      </span>
      <Dropdown placeholder="Category" id="category" v-model="editedTask.category" :options="categoryOptions"
        optionLabel="label" optionValue="value" required />
    </div>

    <div class="p-inputgroup flex-1 forminput">
      <span class="p-inputgroup-addon">
        <i class="pi pi-users"></i>
      </span>
      <MultiSelect id="sharedWith" v-model="selectedUsers" :options="userOptions" optionLabel="name" optionValue="id"
        appendTo="body" placeholder="Share with" />
    </div>

    <Button type="submit" class="btn" icon="pi pi-check" severity="secondary" />
    <Button type="button" class="btn btn1" icon="pi pi-trash" @click="deleteTask" severity="danger" />
    <router-link :to="'/main'"><Button type="button" class="btn btn2" icon="pi pi-times"
        @click="closeDialog" /></router-link>
  </form>
  <Toast />
</div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import store from '../../store/store';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const editedTask = ref({});
const emits = defineEmits();
const toast = useToast();
const visible = ref(false);
const selectedUsers = ref([]);
const priorityOptions = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];
const closeDialog = () => {
  emits('close');
};
const categoryOptions = [
  { label: 'Tech', value: 'Tech' },
  { label: 'Study', value: 'Study' },
  { label: 'Daily', value: 'Daily' },
];
const userOptions = ref([]);
onMounted(async () => {
  await fetchUsers();
});
const fetchUsers = async () => {
  try {
    const res = await store.dispatch('fetchAllUsers');
    console.log(res)
    if (res) {
      userOptions.value = res.users.map((user) => ({
        id: user._id,
        name: user.name,
      }));
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }};
const fetchTaskById = async () => {
  try {
    const taskId = route.params.taskId;
    const response = await store.dispatch('getTaskById', taskId);
    if (response.success) {
      editedTask.value = response.task;

    } else {
      toast.add({ severity: 'error', summary: 'Failed to fetch task' });
    }
  } catch (error) {
    console.error(error);
  }
};
const editTask = async () => {
  try {
    const res = await store.dispatch('updateTask', editedTask.value);
    if (res) {
      toast.add({ severity: 'success', summary: 'Task Updated' });
      await store.dispatch('fetchTasks');
      emits('update-task', editedTask.value);
      router.push('/main')
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async () => {
  try {
    const res = await store.dispatch('deleteTask', editedTask.value._id);
    if (res) {
      toast.add({ severity: 'success', summary: 'Task Deleted' });
      await store.dispatch('fetchTasks');
      emits('delete-task', editedTask.value);
      router.push('/main');
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchTaskById();
});
</script>

<style scoped>
.main{
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;

}
h3{
  font-size: 2.5rem;
  font-weight :200;
  font-family: 'Yesteryear', cursive;
  text-align: center;
  color: #fbc02dff;
  margin-bottom: 10px;
}
.forminput {
  margin-top: 20px;
}

p-dialog-titlebar-close {
  display: hidden;
}

.btn {
  margin-top: 20px;
  transition: .5s;
}

.btn:hover {
  margin-top: 20px;
  border-radius: 10px;
  transform: translateY(-8px);
}

.btn1 {
  margin-left: 10px;
}

.btn2 {
  margin-left: 10px;
  background-color: grey;
}

.btn2:hover {
  background-color: grey !important;
}</style>
