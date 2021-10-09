import {createRouter, createWebHistory} from 'vue-router';

import CardDeck from '../components/CardDeck';
import Login from '../components/Login'

const routes = [
    {
        path: '/deck',
        component: CardDeck
    },
    {
        path: '/',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;