import {createRouter, createWebHistory} from 'vue-router';

import CardDeck from '../components/CardDeck';
import NewCardDeck from '../components/NewCardDeck';
import Login from '../components/Login';
import TeacherDashboard from '../components/TeacherDashboard';
import Register from '../components/Register';
import Home from '../components/Home';
import StudentDashboard from '../components/StudentDashboard';

import store from '../store';

const routes = [
    {
        path: '/:teacherName/:sectionName/:activityName',
        name: 'deck',
        component: CardDeck
    },
    {
        path: '/sheet-manager/:activityID/:mode',
        name: 'newDeck',
        component: NewCardDeck
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/dashboard',
        name: 'teacherDashboard',
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
    },
    {
        path: '/student',
        name: 'studentDashboard',
        component: StudentDashboard
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

router.beforeEach((to, from, next) => {
    const whitelist = ['auth', 'register'];

    const authToken = store.getters.getAuthToken;
    const {userType} = store.getters.getUser;

    if (whitelist.includes(to.name)) {
        if (!authToken) {
            return next();
        } else {
            return next({
                replace: true,
                name: 'home'
            })
        }
    }

    if (to.name === 'teacherDashboard') {
        if (userType !== 'Teacher') {
            return next({
                replace: true,
                name: 'home'
            })
        }
    }

    if (to.name === 'studentDashboard') {
        if (userType !== 'Student') {
            return next({
                replace: true,
                name: 'home'
            })
        }
    }
    
    if (!authToken) {
        return next({
            replace: true,
            name: 'auth'
        });
    }
    
    next();
});

export default router;