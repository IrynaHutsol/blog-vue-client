<template>
    <main class="main-container">
        <Posts/>
    </main>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue';

export default {
    components: {
        Posts
    }
}
</script>

<style>
.main-container {
    background: linear-gradient(#cec5f1, #fca468);
    min-height: calc(100vh - 90px);
    padding: 20px 20px 30px;
}

</style>