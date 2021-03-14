<template>
    <div class="header-menu-container">
        <div class="header-menu" v-if="!token">
            <router-link to="/login">Вхід</router-link> /
            <router-link to="/registration">Реєстрація</router-link>
        </div>
        <div v-else class="user-info">
            <router-link to="/home" class="write-post">Написати статтю</router-link>
            <b-img class="user-avatar" :src="`${url1}${me.avatar_url}`"></b-img>
            <div class="user-block">
                <ul class="user-menu">
                    <router-link to="/profile"><li>
                        <a href="">Мій профіль</a>
                    </li></router-link>
                    <li>
                        <a @click="logout" class="logout">Вийти</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { authService } from '../services';
import Cookies from 'js-cookie';
import { url } from '../services/config';

	export default {
        data() {
            return {
                token: '',
                url1: url
            }
        },
        created() {
            this.token = Cookies.get('token');
        },
        computed: {
			me() { 
                return this.$store.getters.getMe; 
            }
		},
        methods: {
            logout() {
                this.$store.commit('SET_SPINNER', true);
                authService.logout().then(res => {
                    if (res.message == 'Successfully logged out') {
                        Cookies.remove('token');
                        window.location.assign('/');
                        this.$store.commit('SET_SPINNER', false);
                    }
                })
            }
        }
	}
</script>

<style>
.header-menu-container {
    color: #2c3e50;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.header-menu {
    margin-top: 8px;
}
.header-menu a {
    font-size: 19px;
    color: #54616f;
    text-decoration: none;
}
a:hover {
    color: #89929b !important; 
    text-decoration: none !important;
}
.header-menu a.router-link-exact-active {
    color: #fb7842;;
}
.user-avatar:hover ~ div{
	display: block;
}
.user-info {
	position: relative;
}
.user-block {
    width: 200px;
    height: 110px;
    border: none;
    border-radius: 15px;
    position: absolute;
    right: -62px;
    margin-top: 24px;
    background: linear-gradient(#fca468, #cec5f1);
    display: none;
    z-index: 1;
    box-sizing: border-box;
}
.user-block:before {
    position: absolute;
    top: -25px;
    left: 77px;
    transform: rotate(360deg);
    content: '';
    border-style: solid;
    border-width: 0 20px 25px 20px;
    border-color: transparent transparent #f9a56f transparent;
}
.user-block:hover{
	display: block;
}
.user-menu {
    padding: 12px 25px;
    line-height: 40px;
    text-align: left;
    font-size: 19px;
}
.user-menu li {
   list-style: none; 
}
.user-menu li a, .logout {
    color: white;
}
.user-menu li a:hover, .logout:hover {
    color: #ffecac;
    text-decoration: none;
    cursor: pointer;
}
.write-post {
    margin-right: 20px;
    font-size: 17px;
    font-weight: 500;
    color: #fb7842;
}
.write-post:hover {
    color: #89929b;
}
</style>