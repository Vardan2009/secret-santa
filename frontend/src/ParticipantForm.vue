<script setup>
import {
    ref
} from 'vue';

const props = defineProps(["participants"]);
const emit = defineEmits(["addParticipant", "startGame"]);

const nameInput = ref("");
const textInput = ref("");
const slideOut = ref(false);

const addParticipant = () => {
    const name = nameInput.value.trim();
    if (name === '') return;

    slideOut.value = true;

    setTimeout(() => {
        emit("addParticipant", name, textInput.value.trim());
        nameInput.value = "";
        textInput.value = "";
        slideOut.value = false;
    }, 300);
};

const startGame = () => {
    emit("startGame");
};
</script>

<template>
<transition name="slide">
    <div id="pass-phone-page" :key="props.participants.length" v-if="!slideOut">
        <p>Add Participant No. {{ props.participants.length + 1 }}</p>
        <hr>

        <h2>What is your name?</h2>
        <input type="text" v-model="nameInput" placeholder="Your name..." /><br />

        <br />

        <h2>What are your preferences?</h2>
        <p>You can also leave this blank</p>
        <input type="text" v-model="textInput" id="textInput" placeholder="e.g. 'I like planes'"><br />

        <br />

        <br />
        <button @click="addParticipant">Next participant</button>
        <br />or<br />
        <button class="primary" @click="startGame">Start Secret Santa</button>
    </div>
</transition>
</template>

<style scoped>
#pass-phone-page {
    text-align: center;
    padding: 30px;
}

input {
    display: inline-block;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
</style>
