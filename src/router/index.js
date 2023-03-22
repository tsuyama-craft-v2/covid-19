
import MainPage from "../views/Mainpage.vue";
import ShisetuPage from "../views/Shisetupage.vue";
import HelpPage from "../views/Helppage.vue";
import MainPage_Vietnam from "../views/MainPage_Vietnam.vue";
//import Shisetu_itiranpage from "../views/Shisetu_itiranpage";

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Mainpage',
    component: MainPage,
    //component: () => import('../views/MainPage.vue')
  },
  {
    path: '/Mainpage_Vietnam',
    name: 'Mainpage_Vietnam',
    component: MainPage_Vietnam,
  },
  {
    path: '/Detailspage',
    name: 'Detailspage',
    //component: () => import('../views/Detailspage.vue')
  },
  {
    path: '/Detailspage_tsuyama',
    name: 'Detailspage_tsuyama',
    //component: () => import('../views/Detailspage_tsuyama.vue')
  },
  {
    path: '/Detailspage_munic',
    name: 'Detailspage_munic',
    //component: () => import('../views/Detailspage_munic.vue')
  },
  {
    path: '/shisetupage',
    name: 'Shisetupage',
    component: ShisetuPage,
    //component: () => import('../views/ShisetuPage.vue')
  },
  {
    path: '/helppage',
    name: 'Helppage',
    component: HelpPage,
    //component: () => import('../views/HelpPage.vue')
  },
  {
    path: '/shisetupage/itiranpage',
    name: 'Shisetu_itiranpage',
    //component: Shisetu_itiranpage,
    component: () => import('../views/Shisetu_itiranpage.vue'),
    props: true
  },
  {
    path: '/shisetupage/itiran/syousai',
    name: 'Shisetu_syousaipage',
    component: () => import('../views/Shisetu_syousaipage.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router