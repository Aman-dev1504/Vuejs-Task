<template>
  
      
     <div class="card flex align-items-center justify-content-center " data-aos="zoom-out"  data-aos-offset="500"
     data-aos-duration="1000" >
        <Card style="width: 18em ;overflow: hidden ;height: 410px">
            <template #header >
                <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
            </template>
            <template #title > <h4>Advanced Card</h4> </template>
            <template #subtitle> <h5>Card subtitle</h5> </template>
            <template #content>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>
            <template #footer >
                <div class="footer">
                <!-- <Button icon="pi pi-check"  severity="success" /> -->
                <Button icon="pi pi-eye"  severity="primary" style="margin-left: 0.5em" />
                <Button icon="pi pi-pencil"  severity="warning" style="margin-left: 0.5em" />
            </div>
            </template>
        </Card>
    </div> 

</template>
<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
</script>
<style scoped>
img{
width: 100%; 
}
h4{
    font-size: 20px;
}p{
    font-size: 14px;
    max-height: 100px;
    overflow:-moz-hidden-unscrollable;
}

</style>