const routes = [
  {
    name: "LoginIn",
    path: "/login",
    component: () => import("pages/login.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      if(requireLogin) {
        requireLogin: true;
      },
    },
    children: [
      {
        path: "",
        component: () => import("pages/index.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "student",
        component: () => import("pages/student.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "subject",
        component: () => import("pages/subject.vue"),
        meta: { requireLogin: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
