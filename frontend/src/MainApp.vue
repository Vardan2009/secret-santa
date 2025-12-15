<script setup>
import { ref } from 'vue'

import ParticipantForm from './ParticipantForm.vue';
import PassPhone from './PassPhone.vue';

const participants = ref([]);
const gameStarted = ref(false);

const addParticipant = (name, text) => {
    if (name === '') return;
    participants.value.push({name, text});
};

const startGame = () => {
    if (participants.value.length < 3) {
        alert('At least 3 participants are required to start the game.');
        return;
    }
    gameStarted.value = true;
};

const matchingDone = () => {
    alert("done!")
}

</script>

<template>
    <ParticipantForm v-if="!gameStarted" @addParticipant="addParticipant" @startGame="startGame" />
    <PassPhone @done="matchingDone" v-else :participantList="participants" />
</template>