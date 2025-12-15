<script setup>
import {
    ref
} from 'vue';

const props = defineProps({
    participantList: {
        type: Array,
        required: true,
        validator: (list) => list && list.length > 0
    }
});
const emit = defineEmits(["done"]);

const participantList = props.participantList;
const participantTargetMap = {};

function createDerangement(list) {
    let shuffled = [...list];
    let isValid = false;
    let attempts = 0;
    const maxAttempts = 1000;

    while (!isValid && attempts < maxAttempts) {
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        isValid = shuffled.every((participant, i) => participant !== list[i]);
        attempts++;
    }

    if (!isValid) {
        throw new Error("Could not create a valid gift assignment");
    }

    return shuffled;
}

const shuffledParticipants = createDerangement(participantList);

for (let i = 0; i < participantList.length; i++) {
    participantTargetMap[participantList[i].name] = shuffledParticipants[i];
}

console.log(participantTargetMap);

const currentParticipantIdx = ref(0);
const currentRevealed = ref(false);

const revealParticipant = () => {
    currentRevealed.value = true;
};

const nextParticipant = () => {
    if (currentParticipantIdx.value >= participantList.length - 1) {
        emit("done");
        return;
    }

    currentParticipantIdx.value++;
    currentRevealed.value = false;
};
</script>

<template>
<transition name="slide">
    <div id="pass-phone-page" :key="currentParticipantIdx">
        <p>Pass the phone to...</p>
        <h1>{{ participantList[currentParticipantIdx].name }}</h1>
        <hr>

        <template v-if="currentRevealed">
            <p>You are giving a gift to <b>{{ participantTargetMap[participantList[currentParticipantIdx].name].name }}</b>!</p><br /><br />
            <h3>{{ participantTargetMap[participantList[currentParticipantIdx].name].name }}'s preferences</h3>
            <p v-if="participantTargetMap[participantList[currentParticipantIdx].name].text != ''">
                "{{ participantTargetMap[participantList[currentParticipantIdx].name].text }}"
            </p>
            <p v-else>
                <i>Nothing was provided...</i>
            </p>

            <br /><br />
            <button @click="nextParticipant" :class="{ 'primary':currentParticipantIdx >= participantList.length - 1 }">
                <span v-if="currentParticipantIdx < participantList.length - 1">
                    Next participant
                </span>
                <span v-else>Finish</span>
            </button>
        </template>
        <button v-else @click="revealParticipant">
            Reveal
        </button>
    </div>
</transition>
</template>

<style scoped>
#pass-phone-page {
    text-align: center;
    padding: 30px;
}
</style>
