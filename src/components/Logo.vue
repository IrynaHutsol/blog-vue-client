<template>
    <div class="logo-container">
        <router-link to="/" class="logo">
            <img src="../assets/Logo.jpg" alt="Logo">
            <div class="text-logo">Perseverance</div>
        </router-link>
    </div>
</template>

<style>
.logo {
    display: flex;
    align-items: center;
    text-decoration: none !important;
}
.logo img {
    height: 80px;
}
.text-logo {
    margin-left: 20px;
    color: #fb7842;
    font-size: 32px;
}
</style>