<script setup>
import { ref } from 'vue';

const props = defineProps(["participantList"]);

if (!props.participantList || props.participantList.length === 0) {
    throw new Error("participantList prop is required and cannot be empty");
}

const participantList = props.participantList;

const participantTargetMap = {};

let shuffledParticipants = [...participantList];
let isValid = false;

while (!isValid) {
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
    }
    isValid = shuffledParticipants.every((participant, i) => participant !== participantList[i]);
}

for (let i = 0; i < participantList.length; i++) {
    participantTargetMap[participantList[i]] = shuffledParticipants[i];
}

const currentParticipantIdx = ref(0);

const currentRevealed = ref(false);

const revealParticipant = () => {
    alert(`${participantList[currentParticipantIdx.value]}, you are giving a gift to ${participantTargetMap[participantList[currentParticipantIdx.value]]}!`);
    currentParticipantIdx.value++;
    if (currentParticipantIdx.value >= participantList.length) {
        alert("All participants have revealed their targets! Happy gifting!");
        currentParticipantIdx.value = 0; 
    }
};
</script>

<template>
    <h1>Pass the phone to...</h1>
    <p>{{  participantList[currentParticipantIdx] }}</p>

    <p v-if="currentRevealed">You are giving a gift to {{ participantTargetMap[participantList[currentParticipantIdx]] }}!</p>
    <button v-else @click="revealParticipant">
        Reveal
    </button>


</template>