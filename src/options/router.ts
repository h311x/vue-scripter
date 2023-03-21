import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    component: () => import("./routes/Home.vue"),
  },
  {
    path: "/editor/:id",
    component: () => import("./routes/EditorPage.vue"),
  },
] satisfies RouteRecordRaw[]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
