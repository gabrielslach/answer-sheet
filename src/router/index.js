import {createRouter, createWebHistory} from 'vue-router';

import CardDeck from '../components/CardDeck';
import Login from '../components/Login';
import TeacherDashboard from '../components/TeacherDashboard';

// import store from '../store';

const routes = [
    {
        path: '/',
        name: 'deck',
        component: CardDeck
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