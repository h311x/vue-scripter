import { onMessage } from "webext-bridge"

onMessage("runScript", async (v) => {
  window.postMessage({ name: "runScript", s: v.data })
})
