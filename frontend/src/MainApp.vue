<script setup>
import {
    ref
} from 'vue'
import { useRouter } from 'vue-router';

import ParticipantForm from './ParticipantForm.vue';
import PassPhone from './PassPhone.vue';

const router = useRouter();
const participants = ref([]);

const STATE = {
    inputs: "inputs",
    reveals: "reveals"
};

const gameState = ref(STATE.inputs);

const addParticipant = (name, text) => {
    if (name === '') return;
    participants.value.push({
        name,
        text
    });
};

const startGame = () => {
    if (participants.value.length < 3) {
        alert('At least 3 participants are required to start the game.');
        return;
    }
    gameState.value = STATE.reveals;
};

const matchingDone = () => {
    router.push("/")
}
</script>

<template>
<transition name="slide" mode="out-in">
    <ParticipantForm v-if="gameState == STATE.inputs" :key="STATE.inputs" :participants="participants" @addParticipant="addParticipant" @startGame="startGame" />
    <PassPhone v-else-if="gameState == STATE.reveals" :key="STATE.reveals" @done="matchingDone" :participantList="participants" />
</transition>
</template>