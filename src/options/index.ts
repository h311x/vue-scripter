import { createApp } from "vue"
import Options from "./Options.vue"
import "../assets/styles.css"
import "./utils/monacoWorker"
import { router } from "./router"

createApp(Options).use(router).mount("#app")
