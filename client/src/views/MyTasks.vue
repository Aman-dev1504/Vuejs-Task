<template>
  <div class="filter-menu">
    <Dropdown v-model="selectedFilter" :options="filterOptions" optionLabel="label" optionValue="value"
      placeholder="Filter Tasks" @change="filterTasks" class="dialog" aria-label="Filter" />
  </div>

  <div class="task-list">

    <div class="card" v-for="task in filteredTasks" :key="task.id" data-aos="flip-left">
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
            <p class="dueDate">{{ formatDate(task.dueDate) }}</p>
          </div>
        </template>
        <template #content>
          <p class="description">{{ task.description }}</p>
        </template>
        <template #footer>
          <div class="footer">
            <Button icon="pi pi-eye" severity="primary" style="margin-left: 0.5em" @click="showTaskDetails(task)"
              class="btn" />
            <router-link :to="'/edit/' + task._id">
              <Button icon="pi pi-pencil" severity="warning" style="margin-left: 0.5em" class="btn" />
            </router-link>
          </div>
        </template>
      </Card>
    </div>
  </div>

  <TaskDetails :task="selectedTask" :visible="taskDetailsDialogVisible" @close="closeTaskDetailsDialog" />
</template>


<script setup>
import { ref, watch, onMounted } from 'vue';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import store from '../store/store';
import { useRouter } from 'vue-router';
const router = useRouter();
import TaskDetails from '../components/utils/TaskDetails.vue';

const tasks = ref([]);
const selectedTask = ref(null);

const selectedFilter = ref('View All');
const filterOptions = [

  { label: 'View all', value: 'View All' },
  { label: 'Tech', value: 'Tech' },
  { label: 'Study', value: 'Study' },
  { label: 'Daily', value: 'Daily' },
  { label: 'Due Date', value: 'dueDate' },
  { label: 'Priority Low', value: 'Low' },
  { label: 'Priority Medium', value: 'Medium' },
  { label: 'Priority High', value: 'High' },
];

const filteredTasks = ref([]);

const filterTasks = () => {
  if (!selectedFilter.value || selectedFilter.value === 'View All') {
    filteredTasks.value = [...tasks.value];
    return;
  }

  if (selectedFilter.value === 'dueDate') {
    filteredTasks.value = [...tasks.value].sort((a, b) => {
      const dueDateA = new Date(a.dueDate);
      const dueDateB = new Date(b.dueDate);
      return dueDateA - dueDateB;
    });
  } else if (selectedFilter.value === 'Low' || selectedFilter.value === 'Medium' || selectedFilter.value === 'High') {
    filteredTasks.value = tasks.value.filter(task => task.priority === selectedFilter.value);
  } else {
    filteredTasks.value = tasks.value.filter(task => task.category === selectedFilter.value);
  }
};



const taskDetailsDialogVisible = ref(false);

function showTaskDetails(task) {
  selectedTask.value = task;
  taskDetailsDialogVisible.value = true;
}

function closeTaskDetailsDialog() {
  taskDetailsDialogVisible.value = false;
}
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

onMounted(async () => {
  await store.dispatch('fetchTasks');
  tasks.value = store.state.tasks;
  filterTasks();
});
watch(selectedFilter, filterTasks);


watch(() => store.state.tasks, (newTasks) => {
  tasks.value = newTasks;
  filterTasks();
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
