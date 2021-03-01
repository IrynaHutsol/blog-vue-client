<template>
    <div>
        Home
    </div>
</template>

<script>

export default {
    created() {
        this.$store.dispatch('GET_ME');
    }
}
</script>

<style>

</style>