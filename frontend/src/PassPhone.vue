<script setup>
import { ref } from 'vue';

const props = defineProps(["participantList"]);
const emit = defineEmits(["done"])

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
    currentRevealed.value = true;
};

const nextParticipant = () => {
    currentParticipantIdx.value++;

    if(currentParticipantIdx.value >= participantList.length) {
        currentParticipantIdx.value--;
        emit("done");
        return;
    }
    
    currentRevealed.value = false;
}

</script>

<template>
    <h1>Pass the phone to...</h1>
    <p>{{  participantList[currentParticipantIdx].name }}</p>

    <template v-if="currentRevealed">
        <p>You are giving a gift to {{ participantTargetMap[participantList[currentParticipantIdx]].name }}</p>
        <p>{{ participantTargetMap[participantList[currentParticipantIdx]].name }}'s preferences</p>
        <p>
            {{ participantTargetMap[participantList[currentParticipantIdx]].text  }}
        </p>

        <button @click="nextParticipant">
            Next participant
        </button>
    </template>
    <button v-else @click="revealParticipant">
        Reveal
    </button>


</template>