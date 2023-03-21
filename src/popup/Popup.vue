<template>
  <div class="p-4 flex flex-col w-[500px]">
    <div class="flex justify-between items-center mb-10">
      <div class="text-3xl">
        Pick a Script
      </div>
      <Button @click="runtime.openOptionsPage()">
        Click to open options page
      </Button>
    </div>

    <div class="flex flex-col gap-4 w-full">
      <Button @click="runScript(id)" v-for="script, id in scripts" :key="id">
        <h3 class="text-lg">{{ script.name }}</h3>
        <div v-if="script.description" class="text-sm mt-2">{{ script.description }}</div>
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { runtime } from "webextension-polyfill";
import { sendMessage } from 'webext-bridge'
import { useScriptsStore } from "../store/scripts";
import Button from "../shared/ui/Button.vue";

const [scripts] = useScriptsStore()
function runScript(id: string) {
  console.log(id)
  sendMessage('runScript', scripts.value[id], 'background')
}
</script>