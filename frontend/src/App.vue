<script setup></script>

<template>
<router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Delius&display=swap');

:root {
    --background: #f6f4d2;
    --background-darker: #cbdfbd;

    --foreground: #1d2819;

    --accent1: #f1c779;
    --accent1-darker: #a4823f;

    --accent2: #d4e09b;
    --accent2-darker: #a5b651;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--background);
    color: var(--foreground);

    font-family: "Delius", cursive;
    font-weight: 400;
    font-style: normal;

    font-size: larger;

    overflow: hidden;
}

input,
button {
    font: inherit;
}

button {
    background-color: var(--accent1-darker);
    color: var(--accent1);
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    margin: 3px;

    transition: 0.1s ease-in-out;
}

button:hover {
    cursor: pointer;
    background-color: transparent;
    outline: 3px solid var(--accent1);
    outline-offset: -3px;
}

input {
    font: inherit;
    padding: 10px 15px;
    display: block;
    margin: 5px 0px;

    background-color: var(--background-darker);
    border: none;

    border-radius: 5px;
}

hr {
    border-color: var(--foreground);
    opacity: 0.2;
    margin: 20px 10px;
}

@media screen and (orientation: portrait) {

    input,
    button {
        width: 100%;
    }
}

button.primary {
    background-color: var(--accent2-darker);
    color: var(--accent2);
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
