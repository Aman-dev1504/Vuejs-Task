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
        <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
    </TabPanel>
 
</TabView>
   
    </div>
</template>
<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import MyTasks from './MyTasks.vue';
</script>

<style scoped>
.main
{
    padding: 1rem 4rem;
    max-height: 90vh;
    height: 90vh;
    width: 100vw;
    /* background-color: rgb(51, 51, 51); */
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: center; */
}

h2{
    
    font-family: 'Josefin Sans', sans-serif;
     font-weight: 600;
     color: #2C3333;

}
.mr-2{
margin-right: 10px;
}
</style>
