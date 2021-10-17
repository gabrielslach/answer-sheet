import {createRouter, createWebHistory} from 'vue-router';

import CardDeck from '../components/CardDeck';
import Login from '../components/Login';
import TeacherDashboard from '../components/TeacherDashboard';
import Register from '../components/Register';
import Home from '../components/Home';

// import store from '../store';

const routes = [
    {
        path: '/:sectionName/:activityName',
        name: 'deck',
        component: CardDeck
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: TeacherDashboard
    },
    {
        path: '/auth',
        name: 'auth',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

// router.beforeEach((to, from, next) => {
//     if (to.name !== 'auth') {
//         const userInfo = store.getters.getUser;
//         if (!userInfo.authToken) {
//             return next({
//                 replace: true,
//                 name: 'auth'
//             })
//         }
//     }

//     next();
// })

export default router;