import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import Home from '../views/Home.vue'
import NoPage from '../views/NoPage.vue'
import Cookies from 'js-cookie';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/*/',
        name: 'NoPage',
        component: NoPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name == 'Home' && !Cookies.get('token')) {
        next({ name: 'Login' });
    }else {
        next();
    }

    if (to.name == 'Login' || to.name == 'Registration' && Cookies.get('token')) {
        next({ name: 'Home' });
    }else {
        next();
    }
  })

export default router