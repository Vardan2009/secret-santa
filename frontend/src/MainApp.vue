<script setup>
import { ref } from 'vue'

const participants = ref([]);
const participantInput = ref('');

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
</script>

<template>
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
        <button :disabled="participants.length <= 2" @click="alert('Secret Santa started!')">Start Secret Santa</button>
        <p v-if="participants.length <= 2">At least 3 participants required!</p>
    </div>

</template>