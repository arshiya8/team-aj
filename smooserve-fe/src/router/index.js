import { createRouter, createWebHashHistory } from "vue-router";
import { getAuth, onAuthStateChanged} from 'firebase/auth'


//add your page route here
const routes = [
  {
    path: "/",
    name: "landing",
    component: () => import("@/views/Landing.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/auth/User.vue"),
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject)=>{
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next)=>{
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !await getCurrentUser()){
    next({ name: 'login'})
  }else if((to.name=='login' || to.name=='register') && await getCurrentUser()){
    next({ name: 'user'})
  }
  else{
    next()
  }
})

export default router;
