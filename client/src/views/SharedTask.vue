<template>
  <div class="shared-task-list">

    
    <div class="task-list">
      <div class="card" v-for="task in sharedTasks" :key="task._id" data-aos="flip-left">
        <Card style="width: 18em; overflow: hidden; height: 410px">
        <template #header>
          <div class="header">
            <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
            <span class="category" :class="{
              'priority-low': task.priority === 'Low',
              'priority-medium': task.priority === 'Medium',
              'priority-high': task.priority === 'High'
            }">
              {{ task.priority }}
            </span>
          </div>
        </template>
        <template #title>
          <h3>{{ task.title }}</h3>
        </template>
        <template #subtitle>
          <div class="dateNcat">
            <h5>{{ task.category }}</h5>
            <p class="dueDate">{{ formatDate(task?.dueDate) }}</p>
          </div>
        </template>
        <template #content>
          <p class="description">{{ task.description }}</p>
        </template>
        <template #footer>
          <div class="footer">
            <Button icon="pi pi-eye" label="View" severity="primary" style="margin-left: 0.5em" @click="openTaskDetailsDialog(task)"
              class="btn" />
            
          </div>
        </template>
      </Card>
      </div>
    </div>
  </div>
  <TaskDetails :task="selectedTask" :visible="taskDetailsDialogVisible" @close="closeTaskDetailsDialog" />
</template>

<script setup>
import { ref, onMounted,watch } from 'vue';
import TaskDetails from '../components/utils/TaskDetails.vue';
import Card from 'primevue/card';
import store from '../store/store';
import Button from 'primevue/button';
const id = store.getters.userId;
const sharedTasks = ref([]);
const selectedTask = ref(null);
const taskDetailsDialogVisible = ref(false);
onMounted(async () => {
  const res = await store.dispatch('fetchSharedTasks', id);
  if (res && res.success) {
    console.log("Fetched Shared tasks", res.sharedTasks);
    sharedTasks.value = res.sharedTasks; 
  } else {
    console.error('Failed to fetch shared tasks:', res.message);
  }
});
function openTaskDetailsDialog(task) {
  selectedTask.value = task;
  taskDetailsDialogVisible.value = true;
}

function closeTaskDetailsDialog() {
  selectedTask.value = null;
  taskDetailsDialogVisible.value = false;
}
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
watch(() => store.state.sharedTasks, (newTasks) => {
  console.log("Watch triggered. New tasks:", newTasks);
  sharedTasks.value = newTasks;
  console.log(sharedTasks.value);
});
</script>

<style scoped>
img {
  width: 100%;
}

h3 {
  font-size: 20px;
}

h5 {
  font-family: 'Kalam';
  font-size: 19px;
  border-bottom: 3px dotted #00adccff;
  border-radius: 8px;
}

p {
  font-size: 14px;
  max-height: 100px;
  overflow: -moz-hidden-unscrollable;
}

.dateNcat {
  display: flex;
  justify-content: space-between;
}

.dueDate {
  color: rgb(240, 140, 140);
  font-size: 12px;

}

.dialog {
  margin-bottom: 20px;
}


.btn {
  transition: .5s;
}

.btn:hover {
  border-radius: 10px;
  transform: translateY(-8px);
}

.description {
  font-size: 14px;
  max-height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5em;
}

.task-list {
  display: flex;
  /* background-color: #F2F3F4; */
  gap: 70px;
  flex-direction: row;
  flex-wrap: wrap;
}

.header {
  position: relative;
}

.card {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.category {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  background-color: #de2323ff;
  color: white;
  font-size: 0.8rem;
  opacity: 0.8;
}

.priority-low {
  background-color: green;
  color: white;
}

.priority-medium {
  background-color: orange;
  color: white;
}

.priority-high {
  background-color: red;
  color: white;
}
</style>
