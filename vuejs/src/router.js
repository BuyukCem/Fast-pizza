import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const AdminBoard = () => import("./components/AdminBoard.vue")
const PizzeriaBoard = () => import("./components/PizzeriaBoard.vue")
const UserBoard = () => import("./components/UserBoard.vue")
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
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: AdminBoard,
  },
  {
    path: "/mod",
    name: "pizzeria",
    // lazy-loaded
    component: PizzeriaBoard,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: UserBoard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
    const publicPages = ['/','/login', '/register', '/home'];
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
