<template>
    <header class="header" v-if="!noPage">
        <div class="header-container">
            <Logo/>
            <HeaderMenu/>
        </div>
    </header>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/Logo.vue'
import HeaderMenu from '@/components/HeaderMenu.vue'

export default {
    components: {
        Logo,
        HeaderMenu
    },
    data(){
        return{
            noPage: false
        }
    },
    mounted(){
        if (document.getElementById('noPage')) {
            this.noPage = true;
        }
    }
}
</script>

<style>
.header {
    background: white;
}
.header-container {
    width: 940px;
    margin: 0 auto;
    height: 90px;
    display: flex;
    align-items: center;
}
</style>