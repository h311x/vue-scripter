import { useStorageLocal } from "../composables/useStorageLocal"

type Script = {
  name: string
  description?: string
  contentScript: string
}

export const useScriptsStore = () => {
  const scripts = useStorageLocal<Record<string, Script>>(
    "scripts",
    {},
    {
      mergeDefaults: true,
    }
  )

  function createNewScript() {
    scripts.value[window.crypto.randomUUID()] = {
      name: "Untitled Script",
      contentScript: "TODO: add default code",
    }
  }

  function setScriptValue<T extends keyof Script>(
    id: string,
    key: T,
    value: Script[T]
  ) {
    scripts.value[id][key] = value
  }

  function deleteScript(id: string) {
    const { [id]: _, ...rest } = scripts.value
    scripts.value = rest
  }

  return [scripts, { createNewScript, setScriptValue, deleteScript }] as const
}
