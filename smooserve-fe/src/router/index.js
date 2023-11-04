import { createRouter, createWebHashHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//add your page route here
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Landing.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/Register.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/auth/User.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/csp/all",
    name: "AllCSP",
    component: () => import("@/views/csp/CSPList.vue"),
  },
  {
    path: "/csp/:id",
    name: "CSP",
    component: () => import("@/views/csp/CSP.vue"),
  },
  {
    path: "/csp/settings/",
    name: "CSPSetting",
    component: () => import("@/views/csp/settings/CSPSetting.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/csp/signups/",
    name: "CSPSignup",
    component: () => import("@/views/csp/settings/CSPSignup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/csp/links/",
    name: "CSPLinks",
    component: () => import("@/views/csp/settings/CSPLinks.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/csp/appearance/",
    name: "CSPApperance",
    component: () => import("@/views/csp/settings/CSPAppearance.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/csp/zoom",
    name: "Zoom",
    component: () => import("@/views/csp/settings/CSPZoom.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
  //jessa
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutUs.vue"),
  },
  // {
  //   path: "/test",
  //   name: "Test",
  //   component: () => import("@/views/auth/Test.vue"),
  // },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("@/views/FAQ.vue"),
  },
  //annette
  {
    path: "/quiz",
    name: "Quiz",
    component: () => import("@/views/quiz/Quiz.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/quiz1",
    name: "Quiz1",
    component: () => import("@/views/quiz/test.vue"),
  },

  {
    path: "/NearMe",
    name: "Map",
    component: () => import("@/views/maps/Map.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/views/shop/products.vue"),
  },
  {
    path: "/success",
    name: "Success",
    component: () => import("@/views/shop/success.vue"),
  },
  {
    path: "/cancel",
    name: "cancel",
    component: () => import("@/views/shop/cancel.vue"),
  },
  
  
  //rayne
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/profile/Profile.vue"),
    meta: {
      requiresAuth: true
    }
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  document.title = `${import.meta.env.VITE_APP_TITLE} -  ${to.name}`;
  if (requiresAuth && !(await getCurrentUser())) {
    next({ name: "Login" });
  } else if (
    (to.name == "Login" || to.name == "Register") &&
    (await getCurrentUser())
  ) {
    next({ name: "Profile" });
  } else {
    next();
  }
});

export default router;
