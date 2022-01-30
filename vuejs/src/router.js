import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

import ProductForm from './components/ProductForm.vue';
import Profile from "./components/Profile.vue";
import AdminBoard from "./components/AdminBoard.vue"
import PizzeriaBoard from "./components/PizzeriaBoard.vue"
import UserBoard from "./components/UserBoard.vue";
const cart = () => import("./components/cart.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/cart",
    name: "cart",
    component: cart,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminBoard,
  },
  {
    path: "/mod",
    name: "pizzeria",
    component: PizzeriaBoard,
  },
  {
    path: "/user",
    name: "user",
    component: UserBoard,
  },
  {
    path: "/product-form",
    name: "product-from",
    component: ProductForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
    const publicPages = ['/','/login', '/register', '/home', '/product-form'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router;
