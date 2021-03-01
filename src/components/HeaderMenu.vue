<template>
    <div class="header-menu-container">
        <div class="header-menu" v-if="!token">
            <router-link to="/login">Вхід</router-link> /
            <router-link to="/registration">Реєстрація</router-link>
        </div>
        <b-button class="btn-form" variant="secondary" @click.prevent="logout" v-if="token">Вийти</b-button>
    </div>
</template>

<script>
import { authService } from '../services';
import Cookies from 'js-cookie';

	export default {
        data() {
            return {
                token: ''
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
</style>