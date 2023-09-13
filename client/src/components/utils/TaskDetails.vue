<template>
  <Dialog v-model="visible" modal header="Task Details" closeIcon="hidden" :style="{ width: '50vw' }">
    <div class="task-details">
      <h2>{{ task?.title }}</h2>
      <p><strong>Category:</strong> {{ task?.category }}</p>
      <p><strong>Due Date:</strong> {{ formatDate(task?.dueDate) }}</p>
      <p><strong>Description:</strong> {{ task?.description }}</p>
      <p><strong>Priority:</strong> {{ task?.priority }}</p>
    </div>
    <Button type="submit" class="btn btn2" label="Close" @click="closeDialog" />
  </Dialog>
</template>
  
<script setup>
import Dialog from 'primevue/dialog';
import { defineProps } from 'vue';
import Button from 'primevue/button'
const { task } = defineProps(['task']);
const emits = defineEmits();

import { ref } from 'vue';

const visible = ref(false);

// function openDialog() {
//   visible.value = true;
// }


const closeDialog = () => {
  emits('close');
}


function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
</script>
  
<style scoped>
.task-details {
  padding: 20px;

}

.task-details p {
  margin-top: 10px;
}

.btn2 {
  margin-left: 20px;
  background-color: grey;
}
</style>
  