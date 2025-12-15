<script setup>
import { ref } from 'vue'
import PassPhone from './PassPhone.vue';

const participants = ref([]);
const participantInput = ref('');
const gameStarted = ref(false);

const addParticipant = () => {
    const name = participantInput.value.trim();
    if (name === '') return;
    if (participants.value.includes(name)) {
        alert('Participant already added!');
        return;
    }

    participants.value.push(name);
    participantInput.value = "";
};

const startGame = () => {
    if (participants.value.length < 3) {
        alert('At least 3 participants are required to start the game.');
        return;
    }
    gameStarted.value = true;
    alert('Secret Santa started!');
};

</script>

<template>
    <template v-if="!gameStarted">
        <h1>Welcome to the Secret Santa Planner</h1>
   
        <div>
            <h2>Participants:</h2> 
            <ul>
                <li v-for="(participant, index) in participants" :key="index">{{ participant }}</li>
            </ul>
        </div>
    
        <div>
            <label for="participants">Enter participant names</label>
            <input @keyup.enter="addParticipant" type="text" id="participants" v-model="participantInput" placeholder="e.g Alice, Bob, Charlie" />
            <button @click="addParticipant">Add Participant</button>
        </div>

        <div>
            <button :disabled="participants.length <= 2" @click="startGame">Start Secret Santa</button>
            <p v-if="participants.length <= 2">At least 3 participants required!</p>
        </div>
    </template>
    <PassPhone v-else :participantList="participants" />
</template>