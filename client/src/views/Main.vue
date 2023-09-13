<template>
    <div class="main">
        <TabView class="tabview-custom">
            <TabPanel>
                <template #header>
                    <i class="pi pi-sort-amount-down mr-2"></i>
                    <span> My Tasks</span>
                </template>
                <MyTasks />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <i class="pi pi-users mr-2"></i>
                    <span> Shared Tasks</span>
                </template>
                <SharedTask/>
            </TabPanel>

        </TabView>

    </div>
</template>
<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import MyTasks from './MyTasks.vue';
import SharedTask from './SharedTask.vue';
</script>

<style scoped>
.main {
    padding: 1rem 4rem;
    max-height: 90vh;
    height: 90vh;
    width: 100vw;

    display: flex;
    flex-direction: column;

}


h2 {

    font-family: 'Josefin Sans', sans-serif;
    font-weight: 600;
    color: #2C3333;

}

.mr-2 {
    margin-right: 10px;
}</style>
