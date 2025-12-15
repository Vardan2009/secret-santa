<script setup>
import { ref } from 'vue';

const props = defineProps(["participants"]);
const emit = defineEmits(["addParticipant", "startGame"]);

const nameInput = ref("");
const textInput = ref("");


const addParticipant = () => {
    const name = nameInput.value.trim();
    if (name === '') return;

    emit("addParticipant", name, textInput.value.trim());
    nameInput.value = "";
    textInput.value = "";
};

const startGame = () => {
    emit("startGame");
};
</script>

<template>
    <input type="text" v-model="nameInput" placeholder="..." />
    <input type="text" v-model="textInput" id="textInput" placeholder="...">
    
    <button @click="addParticipant">Add participant</button>
    or
    <button @click="startGame">Start Secret Santa</button>
</template>