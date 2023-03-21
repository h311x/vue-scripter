import { onMessage, sendMessage } from "webext-bridge"
import { tabs, scripting, runtime } from "webextension-polyfill"

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true }
  let [tab] = await tabs.query(queryOptions)
  return tab
}

console.log(self.crossOriginIsolated)

onMessage("runScript", async (v) => {
  console.log(v)
  // -> fileStructure
  /**
   *{
   *  name: string,
   *  contentScript: string
   *  backend: {
   *    fileStructre: {
   *      ...
   *    },
   *    behaviour: ''
   *  }
   *
   *}
   TODO: Создать вебконтейнер и протестировать работает ли ваще и
    какой урл отдается при npm run start
   */

  // const current = await getCurrentTab()

  // sendMessage("runScript", v.data, `content-script@${current.id}`)
})

console.log("this is background")
