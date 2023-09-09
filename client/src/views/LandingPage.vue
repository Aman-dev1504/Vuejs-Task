<template>
    <div class="main">
        
        <div class="left-main">
            <h3>Manage Tasks with <span> Taskflow </span></h3>
            <p>TaskFlow is your all-in-one task management solution designed to streamline your work and enhance
                collaboration.
                With TaskFlow, you can effortlessly create tasks, manage your to-do lists, and prioritize assignments.
                Whether you're working solo or with a team, our platform simplifies collaboration by allowing you to assign
                task.</p>
            <div class="join-section">
                <InputText type="text" v-model="value" placeholder="Enter email"  class="input-custom "/>
                <Button label="Get Started" value="" raised  class="button-custom  button-join"/>
            </div>
        </div>
        <div class="right-main " data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000"> 
            <img src="../assets/hero2.png" alt="Hero">
        </div>
    </div>
</template>


<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

</script>
<style scoped> .main {
     max-height: 100vh;
     max-width: 100vw;
     height: 90vh;
     width: 100vw;
     display: flex;
     flex-direction: row;
     background: #f9f9f9 !important;
     font-family: 'Rubik', sans-serif;
     color: #2C3333;
 }

 h3 {
     font-size: 2.5rem;
     font-family: 'Inter', sans-serif;
     margin-bottom: 5px;
 }

 h3 span {
     font-size: 3rem;
     font-family: 'Yesteryear', cursive;
     font-weight: 300;
     color: #e1b16dff;
     text-shadow: 0px 1px 1px rgba(0,0,0,0.47);
 }

 .left-main {
     flex: 1;
     padding:5rem 6rem;
     display: flex;
     flex-direction: column;
     justify-content: center;
     color: #2C3333;
 }

 .right-main {
     flex: 1;
     display: flex;
     align-items: center;
     justify-content: center;
     text-align: center;
     padding: 2rem;
 }

 .right-main img {
     max-height: 500px;
     max-width: 100%;
     height: auto;
 }
 .join-section{
    margin:20px 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
 }
 .button-join{
    margin-left: 20px;
    height: 42px;
 }

 @media (max-width: 768px) {
     .main {
         max-width: 100vw;
         max-height: 100vh;
         flex-direction: column;
         align-items: center;
     }

     h3 {
         font-size: 1.5rem;
     }

     h3 span {
         font-size: 2rem;
     }

     .left-main,
     .right-main {
         font-size: small;
         width: 100%;
         text-align: center;
         padding: 1rem;
     }

     .right-main img {
         max-height: 60%;
         max-width: 100%;
         height: auto;
     }
     .join-section{
    margin:20px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
 }
 }</style>
