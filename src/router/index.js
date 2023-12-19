import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import About from "../views/About.vue";
import Calendar from "../views/Calendar.vue";
import Deneme from "../views/Deneme.vue"


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/deneme',
        name: 'Deneme',
        meta: {requiresAuth:true},
        component: Deneme
    },
    {
        path: '/calendar',
        name: 'Calendar',
        meta: {requiresAuth:true},
        component: Calendar
    },
    {
        path: '/about',
        name: 'About',
        meta: {requiresAuth:true},
        component: About
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
    
})

router.beforeEach((to, from, next) => {
    //backendden session bilgisi almamız lazım
    const publicPages = ["/","/home",'/login', '/register'];
    const loggedIn = true;


    if (publicPages.includes(to.path) || loggedIn) {
            next();
    }
    //kullanıcı giriş yapmamışsa ve protected sayfaya gitmek istiyorsa
    else {
         next("/login");
    }
});
export default router