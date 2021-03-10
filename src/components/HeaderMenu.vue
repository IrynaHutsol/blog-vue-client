<template>
    <div class="header-menu-container">
        <div class="header-menu" v-if="!token">
            <router-link to="/login">Вхід</router-link> /
            <router-link to="/registration">Реєстрація</router-link>
        </div>
        <div v-else>
            <b-img class="user-avatar" :src="`${url1}${me.avatar_url}`"></b-img>
            <div class="user-block">
                <ul class="user-menu">
                    <router-link to="/profile"><li>
                        <a href="">Профіль</a>
                    </li></router-link>
                    <router-link to="/myposts"><li>
                        <a href="">Мої статті</a>
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
                if (this.$route.path == '/' && document.getElementsByClassName('user-block')[0]) {
                    document.getElementsByClassName('user-block')[0].classList.add('user-block-main');
                }
                return this.$store.getters.getMe; 
            }
		},
        methods: {
            logout() {
                authService.logout().then(res => {
                    if (res.message == 'Successfully logged out') {
                        Cookies.remove('token');
                        window.location.assign('/');
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
.user-block {
    width: 200px;
    height: 150px;
    border: none;
    border-radius: 15px;
    position: absolute;
    right: 106px;
    margin-top: 24px;
    background: linear-gradient(#fca468, #cec5f1);
    display: none;
    z-index: 1;
    box-sizing: border-box;
}
.user-block-main {
    right: 97px;
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
</style>